import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
  let resposne;
  switch (method) {
    case 'get':
      resposne = await httpClient.get(url);
      break;
    case 'post':
      resposne = await httpClient.post(url, payload);
      break;
    case 'put':
      resposne = await httpClient.put(url, payload);
      break;
    case 'delete':
      resposne = await httpClient.delete(url);
      break;
  }

  return resposne.data;
};
