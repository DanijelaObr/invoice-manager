import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAll as getCustomers,
  create as createCustomer,
  update as updateCustomer,
  remove as removeCustomer,
} from '../api/customersApi';

const QUERY_KEY = ['customers'];

export function useCustomers() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCustomers,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCustomer(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCustomer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
