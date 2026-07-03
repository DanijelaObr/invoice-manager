import axiosInstance from '../../../api/axiosInstance';
import type { Seller, NewSeller } from '../../../../types';

const RESOURCE = '/sellers';

export const getAll = async (): Promise<Seller[]> => {
  const { data } = await axiosInstance.get<Seller[]>(RESOURCE);
  return data;
};

export const getById = async (id: string): Promise<Seller> => {
  const { data } = await axiosInstance.get<Seller>(`${RESOURCE}/${id}`);
  return data;
};

export const create = async (seller: NewSeller): Promise<Seller> => {
  const { data } = await axiosInstance.post<Seller>(RESOURCE, seller);
  return data;
};

export const update = async (id: string, seller: Seller): Promise<Seller> => {
  const { data } = await axiosInstance.put<Seller>(`${RESOURCE}/${id}`, seller);
  return data;
};

export const remove = async (id: string): Promise<string> => {
  await axiosInstance.delete(`${RESOURCE}/${id}`);
  return id;
};
