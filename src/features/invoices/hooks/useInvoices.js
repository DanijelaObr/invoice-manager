import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAll as getInvoices,
  create as createInvoice,
  update as updateInvoice,
  remove as removeInvoice,
} from '../api/invoicesApi';

const QUERY_KEY = ['invoices'];

// Fetch all invoices
export function useInvoices() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getInvoices,
  });
}

// Create
export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// Update
export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

// Delete
export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
