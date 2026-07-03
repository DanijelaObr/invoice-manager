import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sellersApi } from '../api/sellersApi';

const QUERY_KEY = ['sellers'];

export function useSellers() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: sellersApi.getAll,
  });
}

export function useCreateSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sellersApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => sellersApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteSeller() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sellersApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
