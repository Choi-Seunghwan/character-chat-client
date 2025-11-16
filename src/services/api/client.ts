import axios from 'axios';

// API Base URL (환경변수로 관리 예정)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 추후 토큰 인증 등 추가
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 핸들링
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
