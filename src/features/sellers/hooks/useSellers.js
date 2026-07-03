import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAll as getSellers,
  create as createSeller,
  update as updateSeller,
  remove as removeSeller,
} from '../api/sellersApi';

const QUERY_KEY = ['sellers'];

export function useSellers() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getSellers,
  });
}

export function useCreateSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSeller(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
