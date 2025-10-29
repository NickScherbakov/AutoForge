import axios from 'axios';
import {
  DEMO_MODE,
  demoUser,
  demoChains,
  demoTransactions,
  getDemoExecutionsForChain,
  getDemoChain,
} from './demo-data';

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

// Helper to create mock promise for demo mode
const mockResponse = <T>(data: T): Promise<{ data: T }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data }), 300); // Simulate network delay
  });
};

// Auth API
export const authAPI = {
  register: (email: string, password: string) => {
    if (DEMO_MODE) {
      return mockResponse({ access_token: 'demo_token', token_type: 'bearer' });
    }
    return api.post('/auth/register', { email, password });
  },
  
  login: (email: string, password: string) => {
    if (DEMO_MODE) {
      return mockResponse({ access_token: 'demo_token', token_type: 'bearer' });
    }
    return api.post('/auth/login', { email, password });
  },
};

// User API
export const userAPI = {
  getMe: () => {
    if (DEMO_MODE) {
      return mockResponse(demoUser);
    }
    return api.get('/users/me');
  },
  
  getTransactions: (limit = 50) => {
    if (DEMO_MODE) {
      return mockResponse(demoTransactions.slice(0, limit));
    }
    return api.get('/users/me/transactions', { params: { limit } });
  },
  
  deposit: (amount: number, paymentMethodId: string) => {
    if (DEMO_MODE) {
      return mockResponse({ 
        success: true, 
        message: 'Demo mode: deposit simulated',
        new_balance: demoUser.balance + amount 
      });
    }
    return api.post('/users/me/deposit', { amount, payment_method_id: paymentMethodId });
  },
};

// Chain API
export const chainAPI = {
  list: () => {
    if (DEMO_MODE) {
      return mockResponse(demoChains);
    }
    return api.get('/chains/');
  },
  
  create: (data: any) => {
    if (DEMO_MODE) {
      const newChain = {
        ...data,
        id: demoChains.length + 1,
        is_active: true,
        execution_cost: 0.10,
        created_at: new Date().toISOString(),
      };
      return mockResponse(newChain);
    }
    return api.post('/chains/', data);
  },
  
  get: (id: number) => {
    if (DEMO_MODE) {
      const chain = getDemoChain(id);
      if (!chain) {
        return Promise.reject(new Error('Chain not found'));
      }
      return mockResponse(chain);
    }
    return api.get(`/chains/${id}`);
  },
  
  update: (id: number, data: any) => {
    if (DEMO_MODE) {
      const chain = getDemoChain(id);
      if (!chain) {
        return Promise.reject(new Error('Chain not found'));
      }
      return mockResponse({ ...chain, ...data });
    }
    return api.put(`/chains/${id}`, data);
  },
  
  delete: (id: number) => {
    if (DEMO_MODE) {
      return mockResponse({ success: true });
    }
    return api.delete(`/chains/${id}`);
  },
  
  execute: (id: number, triggerData?: any) => {
    if (DEMO_MODE) {
      return mockResponse({
        execution_id: Math.floor(Math.random() * 10000),
        status: 'queued',
        message: 'Demo mode: execution simulated',
      });
    }
    return api.post(`/chains/${id}/execute`, { chain_id: id, trigger_data: triggerData });
  },
  
  getExecutions: (id: number, limit = 50) => {
    if (DEMO_MODE) {
      const executions = getDemoExecutionsForChain(id);
      return mockResponse(executions.slice(0, limit));
    }
    return api.get(`/chains/${id}/executions`, { params: { limit } });
  },
};
