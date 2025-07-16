import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Skip token for login/register endpoints
    if (
      config.url?.includes('/api/auth/login') ||
      config.url?.includes('/api/auth/register')
    ) {
      return config;
    }

    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
