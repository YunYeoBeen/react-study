import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sendAuthorizationCodeToBackend = async (code: string) => {
      try {
        const response = await fetch("http://localhost:8080/user/login/kakao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }), // 인가 코드를 백엔드로 전달
        });

        if (!response.ok) {        
          throw new Error("Failed to login with Kakao");
        }

        const data = await response.json();
        console.log("Login successful, user data:", data);

        // 로그인 성공 시 메인 페이지로 이동
        navigate("/");
      } catch (error) {
        console.error("Error during login:", error);
        alert("로그인 실패 code: "+code);
        navigate("/"); // 실패 시에도 메인 페이지로 이동
      }
    };

    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      sendAuthorizationCodeToBackend(code);
    } else {
      // 인가 코드가 없을 경우 바로 메인 페이지로 이동
      navigate("/");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
