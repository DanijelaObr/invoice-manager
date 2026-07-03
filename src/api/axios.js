import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor odgovora — centralizovano hvatanje grešaka pristupa
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 401 = neautentifikovan, 403 = nema dozvolu, 404 = ne postoji
    if (status === 401 || status === 403) {
      // Frontend ne smije da prikaže ništa — redirektujemo na početnu ili na login
      window.location.href = '/invoices';
    }

    return Promise.reject(error);
  },
);

export default api;
