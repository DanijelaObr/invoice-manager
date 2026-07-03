import api from '../../../api/axios';

const RESOURCE = '/customers';

export const customersApi = {
  getAll: async () => {
    const { data } = await api.get(RESOURCE);
    return data;
  },
  getById: async (id) => {
    const { data } = await api.get(`${RESOURCE}/${id}`);
    return data;
  },
  create: async (customer) => {
    const { data } = await api.post(RESOURCE, customer);
    return data;
  },
  update: async (id, customer) => {
    const { data } = await api.put(`${RESOURCE}/${id}`, customer);
    return data;
  },
  remove: async (id) => {
    await api.delete(`${RESOURCE}/${id}`);
    return id;
  },
};
