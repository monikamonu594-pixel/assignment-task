import axios, {AxiosError, AxiosInstance} from 'axios';

export const API_BASE_URL = 'https://www.io.pixelsoftwares.com';
export const API_KEY = 'pixel';

export class ApiError extends Error {
  status: number;
  isNetworkError: boolean;
  constructor(message: string, status: number, isNetworkError = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    apikey: API_KEY,
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new ApiError('Request timed out. Please check your connection.', 0, true),
      );
    }
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          'You appear to be offline. Showing cached data when available.',
          0,
          true,
        ),
      );
    }
    const status = error.response.status;
    const message =
      status >= 500
        ? 'Server is having trouble. Please try again shortly.'
        : status === 404
        ? 'The requested data was not found.'
        : 'Something went wrong. Please try again.';
    return Promise.reject(new ApiError(message, status));
  },
);

export default apiClient;
