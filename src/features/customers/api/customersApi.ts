import axiosInstance from '../../../api/axiosInstance';
import type { Customer, NewCustomer } from '../../../../types';

const RESOURCE = '/customers';

export const getAll = async (): Promise<Customer[]> => {
  const { data } = await axiosInstance.get<Customer[]>(RESOURCE);
  return data;
};

export const getById = async (id: string): Promise<Customer> => {
  const { data } = await axiosInstance.get<Customer>(`${RESOURCE}/${id}`);
  return data;
};

export const create = async (customer: NewCustomer): Promise<Customer> => {
  const { data } = await axiosInstance.post<Customer>(RESOURCE, customer);
  return data;
};

export const update = async (
  id: string,
  customer: Customer,
): Promise<Customer> => {
  const { data } = await axiosInstance.put<Customer>(
    `${RESOURCE}/${id}`,
    customer,
  );
  return data;
};

export const remove = async (id: string): Promise<string> => {
  await axiosInstance.delete(`${RESOURCE}/${id}`);
  return id;
};
