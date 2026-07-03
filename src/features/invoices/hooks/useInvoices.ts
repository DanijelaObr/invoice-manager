import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAll as getInvoices,
  create as createInvoice,
  update as updateInvoice,
  remove as removeInvoice,
} from '../api/invoicesApi';
import type { Invoice } from '../../../../types';

const QUERY_KEY = ['invoices'];

// Fetch all invoices
export const useInvoices = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getInvoices,
  });
};

// Create
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

// Update
export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Invoice }) =>
      updateInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

// Delete
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
