
import axios from 'axios';
import { toast } from 'sonner';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message);
    
    // Handle unauthorized errors (token expired)
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// Routing API
export const routingAPI = {
  getDecision: async (preferences: any) => {
    try {
      const response = await api.post('/routing/decide', preferences);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Configuration API
export const configAPI = {
  getConfig: async () => {
    try {
      const response = await api.get('/config');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateConfig: async (config: any) => {
    try {
      const response = await api.post('/config', config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Mock Transaction API (to be replaced with actual API)
export const transactionAPI = {
  getTransactions: async () => {
    // This is a mock implementation - replace with actual API call
    return mockTransactions;
  }
};

// Mock transactions for demo
const mockTransactions = [
  {
    id: 'tx1',
    merchantId: 'merchant123',
    network: 'Ethereum Mainnet',
    fee: '0.0045 ETH',
    confirmationTime: '15 seconds',
    decisionMethod: 'heuristic',
    timestamp: '2023-11-10T12:30:45Z',
    amount: '1.25 ETH',
    status: 'completed'
  },
  {
    id: 'tx2',
    merchantId: 'merchant123',
    network: 'Polygon',
    fee: '0.5 MATIC',
    confirmationTime: '8 seconds',
    decisionMethod: 'hybrid',
    timestamp: '2023-11-10T12:15:30Z',
    amount: '50 MATIC',
    status: 'completed'
  },
  {
    id: 'tx3',
    merchantId: 'merchant123',
    network: 'Optimism',
    fee: '0.0012 ETH',
    confirmationTime: '3 seconds',
    decisionMethod: 'hybrid',
    timestamp: '2023-11-10T11:45:20Z',
    amount: '0.75 ETH',
    status: 'completed'
  },
  {
    id: 'tx4',
    merchantId: 'merchant123',
    network: 'Arbitrum',
    fee: '0.0018 ETH',
    confirmationTime: '5 seconds',
    decisionMethod: 'heuristic',
    timestamp: '2023-11-10T11:20:15Z',
    amount: '0.5 ETH',
    status: 'completed'
  },
  {
    id: 'tx5',
    merchantId: 'merchant123',
    network: 'Ethereum Mainnet',
    fee: '0.0065 ETH',
    confirmationTime: '18 seconds',
    decisionMethod: 'hybrid',
    timestamp: '2023-11-10T10:55:40Z',
    amount: '2.0 ETH',
    status: 'completed'
  }
];

export default api;
