import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import PageHeader from '../../components/PageHeader/PageHeader';
import DataTable from '../../components/DataTable/DataTable';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import InvoiceForm from './components/InvoiceForm';
import { useToast } from '../../components/Toast/ToastContext';
import {
  useInvoices,
  useCreateInvoice,
  useUpdateInvoice,
  useDeleteInvoice,
} from './hooks/useInvoices';
import { useSellers } from '../sellers/hooks/useSellers';
import { useCustomers } from '../customers/hooks/useCustomers';
import { formatAmount, formatDate } from '../../utils/format';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import Pagination from '../../components/Pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import EntityLink from './components/EntityLink';
import { useRowSelection } from '../../hooks/useRowSelection';

const InvoicesPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    selectedIds,
    toggleSelection,
    clearSelection,
    isSelected,
    selectedCount,
    singleSelectedId,
  } = useRowSelection();

  // strict: false — works on both /invoices and /invoices/$id
  const { id: editId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data: invoices = [], isLoading } = useInvoices();
  const { data: sellers = [] } = useSellers();
  const { data: customers = [] } = useCustomers();
  const deleteInvoice = useDeleteInvoice();

  const createInvoice = useCreateInvoice();
  const updateInvoice = useUpdateInvoice();

  const {
    currentPage,
    totalPages,
    paginatedData,
    itemsPerPage,
    goToPage,
    changeItemsPerPage,
  } = usePagination(invoices, ITEMS_PER_PAGE);

  const invoiceToEdit = editId
    ? invoices.find((inv) => String(inv.id) === String(editId))
    : null;

  const isRowHighlighted = (id) =>
    isSelected(id) || String(id) === String(editId);

  useEffect(() => {
    if (editId && !isLoading && invoices.length > 0 && !invoiceToEdit) {
      showToast('Invoice not found.', 'error');
      navigate({ to: '/invoices', replace: true });
    }
  }, [editId, isLoading, invoices.length, invoiceToEdit, navigate, showToast]);

  const getSellerName = (id) =>
    sellers.find((s) => String(s.id) === String(id))?.companyName ?? '—';
  const getCustomerName = (id) => {
    const c = customers.find((c) => String(c.id) === String(id));
    return c ? `${c.name} ${c.surname}` : '—';
  };

  const columns = [
    {
      key: 'seller',
      header: 'Seller',
      render: (row) => (
        <EntityLink to="/sellers" highlight={row.sellerId}>
          {getSellerName(row.sellerId)}
        </EntityLink>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (row) => (
        <EntityLink to="/customers" highlight={row.customerId}>
          {getCustomerName(row.customerId)}
        </EntityLink>
      ),
    },
    { key: 'date', header: 'Date', render: (row) => formatDate(row.date) },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => formatAmount(row.amount),
    },
  ];

  const handleRowClick = (id) => {
    toggleSelection(id);
  };

  const handleCreate = () => setIsCreateOpen(true);
  const handleCloseCreate = () => setIsCreateOpen(false);

  const handleCreateSubmit = (values) => {
    createInvoice.mutate(values, {
      onSuccess: () => {
        showToast('Invoice created successfully.', 'success');
        setIsCreateOpen(false);
      },
      onError: () => showToast('Error creating invoice.', 'error'),
    });
  };

  const handleEdit = () => {
    if (singleSelectedId) {
      navigate({
        to: '/invoices/$id',
        params: { id: String(singleSelectedId) },
      });
    }
  };
  const handleCloseEdit = () => {
    navigate({ to: '/invoices' });
  };

  const handleEditSubmit = (values) => {
    updateInvoice.mutate(
      { id: editId, data: { ...values, id: editId } },
      {
        onSuccess: () => {
          showToast('Invoice updated successfully.', 'success');
          navigate({ to: '/invoices' });
        },
        onError: () => showToast('Error updating invoice.', 'error'),
      },
    );
  };

  const handleDelete = () => {
    if (selectedCount > 0) setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const idsToDelete = [...selectedIds];
    let successCount = 0;

    for (const id of idsToDelete) {
      try {
        await deleteInvoice.mutateAsync(id);
        successCount++;
      } catch (error) {
        console.error(`Failed to delete invoice ${id}:`, error);
      }
    }

    if (successCount > 0) {
      showToast(
        successCount === 1
          ? 'Invoice deleted.'
          : `Deleted invoices: ${successCount}.`,
        'success',
      );
    }
    if (successCount < idsToDelete.length) {
      showToast('Some invoices were not deleted.', 'error');
    }

    setIsConfirmOpen(false);
    clearSelection();
  };

  return (
    <div>
      <PageHeader
        title="Invoices"
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isEditDisabled={selectedCount !== 1}
        isDeleteDisabled={selectedCount === 0}
      />

      <div style={{ marginTop: 'var(--header-height)' }}>
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
        title="Create an invoice"
      >
        <InvoiceForm
          sellers={sellers}
          customers={customers}
          onSubmit={handleCreateSubmit}
          onCancel={handleCloseCreate}
          isSubmitting={createInvoice.isPending}
          submitLabel="Create"
          onValidationError={() =>
            showToast('Please fix the errors in the form.', 'error')
          }
        />
      </Modal>

      <Modal
        isOpen={!!invoiceToEdit}
        onClose={handleCloseEdit}
        title="Edit an invoice"
      >
        {invoiceToEdit && (
          <InvoiceForm
            initialValues={invoiceToEdit}
            sellers={sellers}
            customers={customers}
            onSubmit={handleEditSubmit}
            onCancel={handleCloseEdit}
            isSubmitting={updateInvoice.isPending}
            submitLabel="Save"
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
        title="Delete an invoice"
        message={
          selectedCount === 1
            ? 'Are you sure you want to delete this invoice? This action is irreversible.'
            : `You are about to delete ${selectedCount} invoices. This action is irreversible.`
        }
        isProcessing={deleteInvoice.isPending}
      />
    </div>
  );
};

export default InvoicesPage;
