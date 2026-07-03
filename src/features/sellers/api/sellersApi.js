import axiosInstance from '../../../api/axiosInstance';

const RESOURCE = '/sellers';

export const getAll = async () => {
  const { data } = await axiosInstance.get(RESOURCE);
  return data;
};

export const getById = async (id) => {
  const { data } = await axiosInstance.get(`${RESOURCE}/${id}`);
  return data;
};

export const create = async (seller) => {
  const { data } = await axiosInstance.post(RESOURCE, seller);
  return data;
};

export const update = async (id, seller) => {
  const { data } = await axiosInstance.put(`${RESOURCE}/${id}`, seller);
  return data;
};

export const remove = async (id) => {
  await axiosInstance.delete(`${RESOURCE}/${id}`);
  return id;
};
