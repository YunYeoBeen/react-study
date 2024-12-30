import React from "react";
import "./KakaoStyles.css";
import kakaoButtonImage from "../assets/kakao_login_medium_narrow.png"; // import 방식으로 이미지 불러오기

const KakaoLoginButton: React.FC = () => {
  const handleKakaoLogin = () => {
    const clientId = "6f47201bc042699a7bffec10c96e3327"; // Kakao REST API 키
    const redirectUri = "http://localhost:5173/login/callback/kakao"; // 콜백 URL
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 이동
  };

  return (
    <img
      className="kakao-login-button"
      src={kakaoButtonImage}
      alt="카카오 로그인"
      onClick={handleKakaoLogin}
    />
  );
};

export default KakaoLoginButton;
