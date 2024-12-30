import axios from "axios";
import { TokenService } from "./TokenService";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
AxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = TokenService.getAccessToken();

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (Access Token 만료 시 Refresh Token으로 갱신)
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        const response = await axios.post("http://localhost:8080/auth/refresh", {
          refreshToken,
        });

        const { accessToken } = response.data;

        // 새 Access Token 저장
        if (accessToken && refreshToken) {
          TokenService.saveTokens(accessToken, refreshToken);
        } else {
          throw new Error("Failed to refresh tokens");
        }

        // Authorization 헤더 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        TokenService.clearTokens();
        window.location.href = "/login"; // 로그아웃 처리
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
