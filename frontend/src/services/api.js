import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  search: (query) => api.get(`/products/search?q=${encodeURIComponent(query)}`),
  create: (productData) => api.post('/products', productData),
};

export const bulletinApi = {
  getAll: () => api.get('/bulletin'),
  create: (postData) => api.post('/bulletin', postData),
};

export const orderApi = {
  create: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/my-orders'),
};

export const userApi = {
  getPendingVerifications: () => api.get('/users/pending-verification'),
  verifyUser: (userId) => api.put(`/users/${userId}/verify`),
};

export default api;
