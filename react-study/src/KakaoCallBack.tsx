import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const KakaoCallback: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const sendAuthCodeToServer = async () => {
      const currentUrl = window.location.href;
      console.log("Current URL:", currentUrl); // 현재 URL 로그 출력

      const code = new URL(currentUrl).searchParams.get("code");
      if (!code) {
        console.error("로그인 실패: 인가 코드를 가져올 수 없습니다.");
        alert("로그인 실패: 인가 코드를 가져올 수 없습니다.");
        navigate("/");
        return;
      }

      console.log("Auth Code:", code); // 인가 코드 로그 출력

      try {
        const response = await axios.post("http://localhost:8080/auth/login/kakao", { code });
        const { message, nickName } = response.data;

        console.log("Server Response:", response.data); // 서버 응답 로그 출력
        console.log("Message:", message, "Nickname:", nickName); // 닉네임 로그 출력

        setUser({ nickName }); // Context에 닉네임 저장
        alert("로그인 성공!");
        navigate("/"); // 메인 페이지로 이동
      } catch (error) {
        console.error("로그인 실패:", error); // 에러 로그 출력
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/");
      }
    };

    sendAuthCodeToServer();
  }, [setUser, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
