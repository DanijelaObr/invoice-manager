import axiosInstance from '../../../api/axiosInstance';

const RESOURCE = '/customers';

export const getAll = async () => {
  const { data } = await axiosInstance.get(RESOURCE);
  return data;
};

export const getById = async (id) => {
  const { data } = await axiosInstance.get(`${RESOURCE}/${id}`);
  return data;
};

export const create = async (customer) => {
  const { data } = await axiosInstance.post(RESOURCE, customer);
  return data;
};

export const update = async (id, customer) => {
  const { data } = await axiosInstance.put(`${RESOURCE}/${id}`, customer);
  return data;
};

export const remove = async (id) => {
  await axiosInstance.delete(`${RESOURCE}/${id}`);
  return id;
};
