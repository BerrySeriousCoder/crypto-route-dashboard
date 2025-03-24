
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

// Mock data for demo mode
const DEMO_MODE = true;

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    if (DEMO_MODE) {
      // In demo mode, we'll simulate a successful API response
      return Promise.resolve({
        token: 'demo-jwt-token',
        user: {
          id: 'user-123',
          email: email,
          name: 'Demo User'
        }
      });
    }
    
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
    if (DEMO_MODE) {
      // In demo mode, we'll simulate a successful API response
      return new Promise((resolve) => {
        // Add a delay to simulate network latency
        setTimeout(() => {
          // Based on preferences, return different mock data
          if (preferences?.useAiFallback) {
            resolve({
              selectedNetwork: 'Optimism',
              decisionMethod: 'hybrid',
              aiRecommendation: 'Optimism',
              stats: {
                gasPrice: '0.0012 ETH',
                confirmationTime: '3 seconds',
                congestion: 'Low',
              },
            });
          } else {
            resolve({
              selectedNetwork: 'Ethereum Mainnet',
              decisionMethod: 'heuristic',
              stats: {
                gasPrice: '0.0045 ETH',
                confirmationTime: '15 seconds',
                congestion: 'Medium',
              },
            });
          }
        }, 1500);
      });
    }
    
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
    if (DEMO_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            merchantId: 'merchant123',
            defaultSettings: {
              maxFeePercentage: 5,
              preferredNetworks: ['Ethereum', 'Polygon', 'Optimism', 'Arbitrum'],
              minConfirmationTime: 30,
              useAiFallback: true
            },
            apiKeys: {
              isConfigured: true,
              lastUpdated: '2023-10-15T14:30:00Z'
            },
            notificationSettings: {
              email: true,
              slack: false,
              webhook: ''
            }
          });
        }, 800);
      });
    }
    
    try {
      const response = await api.get('/config');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateConfig: async (config: any) => {
    if (DEMO_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Configuration updated successfully',
            config: config
          });
        }, 1000);
      });
    }
    
    try {
      const response = await api.post('/config', config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Transaction API with expanded mock data
export const transactionAPI = {
  getTransactions: async () => {
    if (DEMO_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockTransactions);
        }, 1200);
      });
    }
    
    try {
      const response = await api.get('/transactions');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Enhanced mock transactions for demo
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
  },
  {
    id: 'tx6',
    merchantId: 'merchant123',
    network: 'Polygon',
    fee: '0.3 MATIC',
    confirmationTime: '6 seconds',
    decisionMethod: 'hybrid',
    timestamp: '2023-11-10T10:30:22Z',
    amount: '25 MATIC',
    status: 'completed'
  },
  {
    id: 'tx7',
    merchantId: 'merchant123',
    network: 'Optimism',
    fee: '0.0010 ETH',
    confirmationTime: '4 seconds',
    decisionMethod: 'hybrid',
    timestamp: '2023-11-10T10:05:18Z',
    amount: '0.5 ETH',
    status: 'completed'
  },
  {
    id: 'tx8',
    merchantId: 'merchant123',
    network: 'Arbitrum',
    fee: '0.0022 ETH',
    confirmationTime: '7 seconds',
    decisionMethod: 'heuristic',
    timestamp: '2023-11-10T09:40:12Z',
    amount: '0.8 ETH',
    status: 'completed'
  },
  {
    id: 'tx9',
    merchantId: 'merchant123',
    network: 'Ethereum Mainnet',
    fee: '0.0050 ETH',
    confirmationTime: '16 seconds',
    decisionMethod: 'heuristic',
    timestamp: '2023-11-10T09:15:05Z',
    amount: '1.5 ETH',
    status: 'completed'
  },
  {
    id: 'tx10',
    merchantId: 'merchant123',
    network: 'Polygon',
    fee: '0.6 MATIC',
    confirmationTime: '10 seconds',
    decisionMethod: 'hybrid',
    timestamp: '2023-11-10T08:50:42Z',
    amount: '100 MATIC',
    status: 'completed'
  }
];

export default api;
