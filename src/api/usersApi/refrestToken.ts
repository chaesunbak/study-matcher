import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refresh_token');
    const response = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
    const newAccessToken = response.data.access_token;

    // 새 액세스 토큰을 sessionStorage에 저장
    sessionStorage.setItem('access_token', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    window.location.href = '/login';
    throw error;
  }
};
