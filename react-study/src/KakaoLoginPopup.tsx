import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const KakaoLoginPopup: React.FC = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const sendAuthCodeToServer = async () => {
      const code = new URL(window.location.href).searchParams.get("code"); // 인가 코드 추출
      if (!code) {
        alert("로그인 실패: 인가 코드를 가져올 수 없습니다.");
        window.close();
        return;
      }

      try {
        // 인가 코드를 서버로 전송
        const response = await axios.post("http://localhost:8080/auth/login/kakao", { code });
        const { message, nickName } = response.data;

        console.log("Server Message:", message); // 서버에서 온 메시지 로그
        setUser({ nickName }); // Context에 nickname 저장
        alert("로그인 성공!");
        window.close(); // 팝업 창 닫기
      } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        window.close();
      }
    };

    sendAuthCodeToServer();
  }, [setUser]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoLoginPopup;
