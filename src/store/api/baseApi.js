// api/baseApi.js
import { createApi, retry } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { logout, setTokens } from '../store/slices/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Token helpers using jsonwebtoken
const tokenHelpers = {
  // ... (keep as is)
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Shared refresh promise for all concurrent requests
let refreshPromise = null;

// Axios interceptor for handling responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: 'Network error - please check your connection',
        status: 'NETWORK_ERROR',
      });
    }
    return Promise.reject(error);
  }
);

// Token refresh function using Axios
const refreshToken = async (refreshTokenValue) => {
  if (!refreshTokenValue) {
    throw new Error('No refresh token provided');
  }
  
  try {
    const response = await axiosInstance.post('/auth/refresh-token', {
      refreshToken: refreshTokenValue,
    });
    
    if (!response.data || !response.data.accessToken) {
      throw new Error('Invalid response from refresh endpoint');
    }
    
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('Refresh token expired or invalid');
    }
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
};

// Axios-based base query with retry and token refresh
const axiosBaseQuery = async ({ url, method, body, params, headers }, api, extraOptions) => {
  const { getState, dispatch } = api;
  
  const state = getState();
  const accessToken = state.auth?.accessToken;
  const refreshTokenValue = state.auth?.refreshToken;

  const makeRequest = async (token) => {
    const requestHeaders = { 
      'Content-Type': 'application/json',
      ...headers 
    };
    
    if (token && tokenHelpers.isValid(token)) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
    
    return axiosInstance({
      url,
      method: method || 'GET',
      data: body,
      params,
      headers: requestHeaders,
      ...extraOptions,
    });
  };

  try {
    const response = await makeRequest(accessToken);
    return {
      data: response.data,
      meta: {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      },
    };
  } catch (error) {
    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && refreshTokenValue) {
      
      if (tokenHelpers.isExpired(refreshTokenValue)) {
        console.warn('Refresh token expired, logging out');
        dispatch(logout());
        return {
          error: {
            status: 401,
            data: { message: 'Session expired. Please login again.' },
          },
        };
      }

      try {
        if (!refreshPromise) {
          refreshPromise = (async () => {
            try {
              const refreshData = await refreshToken(refreshTokenValue);
              const newAccessToken = refreshData.accessToken;
              
              if (!newAccessToken || tokenHelpers.isExpired(newAccessToken)) {
                throw new Error('Invalid new token received');
              }
              
              dispatch(setTokens({
                accessToken: newAccessToken,
                refreshToken: refreshData.refreshToken || refreshTokenValue,
                user: refreshData.user || state.auth?.user,
              }));
              
              return newAccessToken;
            } catch (refreshError) {
              refreshPromise = null;
              throw refreshError;
            }
          })();
        }
        
        const newToken = await refreshPromise;
        refreshPromise = null;
        
        const retryResponse = await makeRequest(newToken);
        return {
          data: retryResponse.data,
          meta: {
            status: retryResponse.status,
            statusText: retryResponse.statusText,
            headers: retryResponse.headers,
          },
        };
      } catch (refreshError) {
        refreshPromise = null;
        console.error('Token refresh failed:', refreshError);
        dispatch(logout());
        
        return {
          error: {
            status: 401,
            data: { 
              message: refreshError.message || 'Session expired. Please login again.' 
            },
          },
        };
      }
    }

    const errorStatus = error.response?.status || 'FETCH_ERROR';
    const errorData = error.response?.data || { 
      message: error.message || 'An error occurred' 
    };
    
    if (errorStatus !== 401) {
      console.error(`API Error (${errorStatus}):`, errorData);
    }
    
    return {
      error: {
        status: errorStatus,
        data: errorData,
      },
    };
  }
};

// Wrap with retry logic
const baseQueryWithRetry = retry(
  async (args, api, extraOptions) => {
    const result = await axiosBaseQuery(args, api, extraOptions);
    
    // Don't retry network errors for POST requests
    if (result.error?.status === 'NETWORK_ERROR' && args.method === 'POST') {
      return result;
    }
    
    return result;
  },
  {
    maxRetries: MAX_RETRIES,
    backoff: (attempt) => {
      const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
      const jitter = Math.random() * 200;
      return Math.min(delay + jitter, 30000);
    },
  }
);

// Create the base API
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({}),
});

export { tokenHelpers, axiosInstance };
export default baseApi;