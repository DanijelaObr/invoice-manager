import axiosInstance from '../../../api/axiosInstance';
import type { Invoice, NewInvoice } from '../../../../types';

const RESOURCE = '/invoices';

export const getAll = async (): Promise<Invoice[]> => {
  const { data } = await axiosInstance.get<Invoice[]>(RESOURCE);
  return data;
};

export const getById = async (id: string): Promise<Invoice> => {
  const { data } = await axiosInstance.get<Invoice>(`${RESOURCE}/${id}`);
  return data;
};

export const create = async (invoice: NewInvoice): Promise<Invoice> => {
  const { data } = await axiosInstance.post<Invoice>(RESOURCE, invoice);
  return data;
};

export const update = async (
  id: string,
  invoice: Invoice,
): Promise<Invoice> => {
  const { data } = await axiosInstance.put<Invoice>(
    `${RESOURCE}/${id}`,
    invoice,
  );
  return data;
};

export const remove = async (id: string): Promise<string> => {
  await axiosInstance.delete(`${RESOURCE}/${id}`);
  return id;
};
