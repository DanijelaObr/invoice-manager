import axios from 'axios';
import type { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — centralized handling of access errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    // 401 = unauthenticated, 403 = forbidden
    if (status === 401 || status === 403) {
      // The frontend must not display anything — redirect to the home page
      window.location.href = '/invoices';
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
