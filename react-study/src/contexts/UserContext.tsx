import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TokenService } from "./TokenService";
import axios from "axios";

interface User {
  nickName: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const restoreUser = async () => {
      const refreshToken = TokenService.getRefreshToken();

      if (refreshToken) {
        try {
          // Refresh Token으로 Access Token 갱신
          const response = await axios.post("http://localhost:8080/auth/refresh", {
            refreshToken,
          });

          const { accessToken, nickName } = response.data;

          // 새 Access Token 저장
          TokenService.saveTokens(accessToken, refreshToken);

          // 사용자 정보 설정
          setUser({ nickName });
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          TokenService.clearTokens(); // Refresh Token이 유효하지 않으면 삭제
          setUser(null);
        }
      }
    };

    restoreUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
