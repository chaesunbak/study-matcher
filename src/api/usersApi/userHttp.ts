import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_TIMEOUT = 30000;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      //   try {
      //     const newAccessToken = await refreshAccessToken();
      //     error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      //     return axiosInstance.request(error.config);
      //   } catch (refreshError) {
      //     console.error('리프레시 중 에러 발생:', refreshError);
      //     return Promise.reject(refreshError);
      //   }
      window.location.href = '/login';
      return;
    }
    return Promise.reject(error);
  }
);

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandlerUser = async <T, U = any>(
  method: RequestMethod,
  url: string,
  payload?: T
): Promise<U> => {
  switch (method) {
    case 'get':
      return await axiosInstance.get(url);

    case 'post':
      return await axiosInstance.post(url, payload ?? { default: 'default_value' });

    case 'put':
      return await axiosInstance.put(url, payload ?? { default: 'default_value' });

    case 'delete':
      return await axiosInstance.delete(url);

    default:
      throw new Error('Unsupported request method');
  }
};
