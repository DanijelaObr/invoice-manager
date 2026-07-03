import axiosInstance from '../../../api/axiosInstance';

const RESOURCE = '/invoices';

export const getAll = async () => {
  const { data } = await axiosInstance.get(RESOURCE);
  return data;
};

export const getById = async (id) => {
  const { data } = await axiosInstance.get(`${RESOURCE}/${id}`);
  return data;
};

export const create = async (invoice) => {
  const { data } = await axiosInstance.post(RESOURCE, invoice);
  return data;
};

export const update = async (id, invoice) => {
  const { data } = await axiosInstance.put(`${RESOURCE}/${id}`, invoice);
  return data;
};

export const remove = async (id) => {
  await axiosInstance.delete(`${RESOURCE}/${id}`);
  return id;
};
