import axios, { AxiosError } from 'axios';
import { getToken, removeToken } from '@/lib/utils/storage';

export interface ApiError {
  message: string;
  statusCode: number;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    if (status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    const message = error.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.';

    return Promise.reject(new Error(message));
  },
);
