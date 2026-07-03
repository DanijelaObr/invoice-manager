import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAll as getSellers,
  create as createSeller,
  update as updateSeller,
  remove as removeSeller,
} from '../api/sellersApi';
import type { Seller } from '../../../../types';

const QUERY_KEY = ['sellers'];

export const useSellers = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getSellers,
  });
};

export const useCreateSeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useUpdateSeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Seller }) =>
      updateSeller(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};

export const useDeleteSeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
};
