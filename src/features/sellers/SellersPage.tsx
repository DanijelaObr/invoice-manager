import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearch } from '@tanstack/react-router';
import PageHeader from '../../components/PageHeader/PageHeader';
import DataTable from '../../components/DataTable/DataTable';
import type { Column } from '../../components/DataTable/DataTable';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import SellerForm from './components/SellerForm';
import { useToast } from '../../components/Toast/ToastContext';
import {
  useSellers,
  useCreateSeller,
  useUpdateSeller,
  useDeleteSeller,
} from './hooks/useSellers';
import { useInvoices } from '../invoices/hooks/useInvoices';
import Pagination from '../../components/Pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import { useRowSelection } from '../../hooks/useRowSelection';
import type { Seller, NewSeller } from '../../../types';

const SellersPage = () => {
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

  const { id: editId } = useParams({ strict: false });
  const { highlight: highlightId } = useSearch({ strict: false });
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data: sellers = [], isLoading } = useSellers();
  const { data: invoices = [] } = useInvoices();

  const createSeller = useCreateSeller();
  const updateSeller = useUpdateSeller();
  const deleteSeller = useDeleteSeller();

  const isRowHighlighted = (id: string) =>
    isSelected(id) || String(id) === String(editId);

  useEffect(() => {
    if (highlightId) {
      selectRow(highlightId);
      // Clear the highlight from the URL after selecting the row
      navigate({ to: '/sellers', replace: true });
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
  } = usePagination(sellers, ITEMS_PER_PAGE);

  const sellerToEdit = editId
    ? sellers.find((s) => String(s.id) === String(editId))
    : null;

  useEffect(() => {
    if (editId && !isLoading && sellers.length > 0 && !sellerToEdit) {
      showToast('Seller not found.', 'error');
      navigate({ to: '/sellers', replace: true });
    }
  }, [editId, isLoading, sellers.length, sellerToEdit, navigate, showToast]);

  const columns: Column<Seller>[] = [
    { key: 'companyName', header: 'Company' },
    { key: 'hqAddress', header: 'HQ Address' },
    {
      key: 'isActive',
      header: 'Status',
      render: (row) => (row.isActive ? 'Active' : 'Inactive'),
    },
  ];

  const handleRowClick = (id: string) => {
    toggleSelection(id);
  };

  const handleCreate = () => setIsCreateOpen(true);
  const handleCloseCreate = () => setIsCreateOpen(false);
  const handleCreateSubmit = (values: NewSeller) => {
    createSeller.mutate(values, {
      onSuccess: () => {
        showToast('Seller created successfully.', 'success');
        setIsCreateOpen(false);
      },
      onError: () => showToast('Error creating seller.', 'error'),
    });
  };

  const handleEdit = () => {
    if (singleSelectedId) {
      navigate({
        to: '/sellers/$id',
        params: { id: String(singleSelectedId) },
      });
    }
  };
  const handleCloseEdit = () => navigate({ to: '/sellers' });
  const handleEditSubmit = (values: NewSeller) => {
    if (!editId) return;
    updateSeller.mutate(
      { id: editId, data: { ...values, id: editId } },
      {
        onSuccess: () => {
          showToast('Seller edited successfully.', 'success');
          navigate({ to: '/sellers' });
        },
        onError: () => showToast('Error editing seller.', 'error'),
      },
    );
  };

  const handleDelete = () => {
    if (selectedCount === 0) return;

    const blocked = selectedIds.filter((id) =>
      invoices.some((inv) => String(inv.sellerId) === String(id)),
    );

    if (blocked.length > 0) {
      showToast(
        'Some of the selected sellers are on the invoices and cannot be deleted.',
        'error',
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
        await deleteSeller.mutateAsync(id);
        successCount++;
      } catch (error) {
        console.error(`Failed to delete seller ${id}:`, error);
      }
    }

    if (successCount > 0) {
      showToast(
        successCount === 1
          ? 'Seller deleted.'
          : `Deleted sellers: ${successCount}.`,
        'success',
      );
    }
    if (successCount < idsToDelete.length) {
      showToast('Some sellers were not deleted.', 'error');
    }

    setIsConfirmOpen(false);
    clearSelection();
  };

  return (
    <div>
      <PageHeader
        title="Sellers"
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
        title="Create seller"
      >
        <SellerForm
          onSubmit={handleCreateSubmit}
          onCancel={handleCloseCreate}
          isSubmitting={createSeller.isPending}
          submitLabel="Create"
          onValidationError={() =>
            showToast('Please fix the errors in the form.', 'error')
          }
        />
      </Modal>

      <Modal
        isOpen={!!sellerToEdit}
        onClose={handleCloseEdit}
        title="Edit seller"
      >
        {sellerToEdit && (
          <SellerForm
            initialValues={sellerToEdit}
            onSubmit={handleEditSubmit}
            onCancel={handleCloseEdit}
            isSubmitting={updateSeller.isPending}
            submitLabel="Save"
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
        title="Delete seller"
        message={
          selectedCount === 1
            ? 'Are you sure you want to delete this seller? This action is irreversible.'
            : `You are about to delete ${selectedCount} sellers. This action is irreversible.`
        }
        isProcessing={deleteSeller.isPending}
      />
    </div>
  );
};

export default SellersPage;
