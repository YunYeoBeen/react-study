// TokenService.ts
export const TokenService = {
    saveTokens: (accessToken: string, refreshToken: string) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    getAccessToken: (): string | null => {
      return localStorage.getItem("accessToken");
    },
    getRefreshToken: (): string | null => {
      return localStorage.getItem("refreshToken");
    },
    clearTokens: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  };
  