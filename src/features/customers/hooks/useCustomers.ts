import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAll as getCustomers,
  create as createCustomer,
  update as updateCustomer,
  remove as removeCustomer,
} from '../api/customersApi';
import type { Customer } from '../../../../types';

const QUERY_KEY = ['customers'];

export const useCustomers = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCustomers,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Customer }) =>
      updateCustomer(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCustomer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};
