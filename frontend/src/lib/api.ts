import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (email: string, password: string) =>
    api.post('/auth/register', { email, password }),
  
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

// User API
export const userAPI = {
  getMe: () => api.get('/users/me'),
  
  getTransactions: (limit = 50) =>
    api.get('/users/me/transactions', { params: { limit } }),
  
  deposit: (amount: number, paymentMethodId: string) =>
    api.post('/users/me/deposit', { amount, payment_method_id: paymentMethodId }),
};

// Chain API
export const chainAPI = {
  list: () => api.get('/chains/'),
  
  create: (data: any) => api.post('/chains/', data),
  
  get: (id: number) => api.get(`/chains/${id}`),
  
  update: (id: number, data: any) => api.put(`/chains/${id}`, data),
  
  delete: (id: number) => api.delete(`/chains/${id}`),
  
  execute: (id: number, triggerData?: any) =>
    api.post(`/chains/${id}/execute`, { chain_id: id, trigger_data: triggerData }),
  
  getExecutions: (id: number, limit = 50) =>
    api.get(`/chains/${id}/executions`, { params: { limit } }),
};
