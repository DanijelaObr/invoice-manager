import api from '../../../api/axios';

const RESOURCE = '/sellers';

export const sellersApi = {
  getAll: async () => {
    const { data } = await api.get(RESOURCE);
    return data;
  },
  getById: async (id) => {
    const { data } = await api.get(`${RESOURCE}/${id}`);
    return data;
  },
  create: async (seller) => {
    const { data } = await api.post(RESOURCE, seller);
    return data;
  },
  update: async (id, seller) => {
    const { data } = await api.put(`${RESOURCE}/${id}`, seller);
    return data;
  },
  remove: async (id) => {
    await api.delete(`${RESOURCE}/${id}`);
    return id;
  },
};
