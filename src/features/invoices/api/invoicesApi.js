import api from '../../../api/axios';

const RESOURCE = '/invoices';

export const invoicesApi = {
  getAll: async () => {
    const { data } = await api.get(RESOURCE);
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`${RESOURCE}/${id}`);
    return data;
  },

  create: async (invoice) => {
    const { data } = await api.post(RESOURCE, invoice);
    return data;
  },

  update: async (id, invoice) => {
    const { data } = await api.put(`${RESOURCE}/${id}`, invoice);
    return data;
  },

  remove: async (id) => {
    await api.delete(`${RESOURCE}/${id}`);
    return id;
  },
};
