import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import DataTable from "../../components/DataTable/DataTable";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import CustomerForm from "./components/CustomerForm";
import { useToast } from "../../components/Toast/ToastContext";
import {
  useCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "./hooks/useCustomers";
import { useInvoices } from "../invoices/hooks/useInvoices";
import Pagination from "../../components/Pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { useRowSelection } from "../../hooks/useRowSelection";

function CustomersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    selectedIds,
    toggleSelection,
    selectRow,
    clearSelection,
    isSelected,
    selectedCount,
    singleSelectedId,
  } = useRowSelection();

  const { id: editId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data: customers = [], isLoading } = useCustomers();
  const { data: invoices = [] } = useInvoices();

  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();

  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const isRowHighlighted = (id) =>
    isSelected(id) || String(id) === String(editId);

  useEffect(() => {
    if (highlightId) {
      selectRow(highlightId);
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightId]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    itemsPerPage,
    goToPage,
    changeItemsPerPage,
  } = usePagination(customers, ITEMS_PER_PAGE);

  const customerToEdit = editId
    ? customers.find((c) => String(c.id) === String(editId))
    : null;

  useEffect(() => {
    if (editId && !isLoading && customers.length > 0 && !customerToEdit) {
      showToast("Customer not found.", "error");
      navigate("/customers", { replace: true });
    }
  }, [
    editId,
    isLoading,
    customers.length,
    customerToEdit,
    navigate,
    showToast,
  ]);

  const columns = [
    { key: "name", header: "First name" },
    { key: "surname", header: "Last name" },
    { key: "address", header: "Address" },
    { key: "age", header: "Age" },
  ];

  const handleRowClick = (id) => {
    toggleSelection(id);
  };

  // CREATE
  const handleCreate = () => setIsCreateOpen(true);
  const handleCloseCreate = () => setIsCreateOpen(false);
  const handleCreateSubmit = (values) => {
    createCustomer.mutate(values, {
      onSuccess: () => {
        showToast("Customer created successfully", "success");
        setIsCreateOpen(false);
      },
      onError: () => showToast("Error creating customer.", "error"),
    });
  };

  // EDIT
  const handleEdit = () => {
    if (singleSelectedId) navigate(`/customers/${singleSelectedId}`);
  };
  const handleCloseEdit = () => navigate("/customers");
  const handleEditSubmit = (values) => {
    updateCustomer.mutate(
      { id: editId, data: { ...values, id: editId } },
      {
        onSuccess: () => {
          showToast("Customer edited successfully.", "success");
          navigate("/customers");
        },
        onError: () => showToast("Error ediitng customer.", "error"),
      },
    );
  };

  // DELETE — bulk sa provjerom integriteta
  const handleDelete = () => {
    if (selectedCount === 0) return;

    const blocked = selectedIds.filter((id) =>
      invoices.some((inv) => String(inv.customerId) === String(id)),
    );

    if (blocked.length > 0) {
      showToast(
        "Some of the selected customers are on invoices and cannot be deleted.",
        "error",
      );
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const idsToDelete = [...selectedIds];
    let successCount = 0;

    for (const id of idsToDelete) {
      try {
        await deleteCustomer.mutateAsync(id);
        successCount++;
      } catch {
        // nastavi
      }
    }

    if (successCount > 0) {
      showToast(
        successCount === 1
          ? "Customer deleted"
          : `Customers deleted: ${successCount}.`,
        "success",
      );
    }
    if (successCount < idsToDelete.length) {
      showToast("Some customers were not deleted.", "error");
    }

    setIsConfirmOpen(false);
    clearSelection();
  };

  return (
    <div>
      <PageHeader
        title="Customers"
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isEditDisabled={selectedCount !== 1}
        isDeleteDisabled={selectedCount === 0}
      />

      <div style={{ marginTop: "var(--header-height)" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={paginatedData}
              isSelected={isRowHighlighted}
              onRowClick={handleRowClick}
              currentPage={currentPage}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={changeItemsPerPage}
            />
          </>
        )}
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={handleCloseCreate}
        title="Create a customer"
      >
        <CustomerForm
          onSubmit={handleCreateSubmit}
          onCancel={handleCloseCreate}
          isSubmitting={createCustomer.isPending}
          submitLabel="Create"
          onValidationError={() =>
            showToast("Please fix the errors in the form.", "error")
          }
        />
      </Modal>

      <Modal
        isOpen={!!customerToEdit}
        onClose={handleCloseEdit}
        title="Edit customer"
      >
        {customerToEdit && (
          <CustomerForm
            initialValues={customerToEdit}
            onSubmit={handleEditSubmit}
            onCancel={handleCloseEdit}
            isSubmitting={updateCustomer.isPending}
            submitLabel="Save"
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
        title="Delete customer"
        message={
          selectedCount === 1
            ? "Are you sure you want to delete this customer? This action is irreversible."
            : `You are about to delete ${selectedCount} customers. This action is irreversible.`
        }
        isProcessing={deleteCustomer.isPending}
      />
    </div>
  );
}

export default CustomersPage;
