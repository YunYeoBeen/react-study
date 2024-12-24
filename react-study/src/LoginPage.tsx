import React from "react";
import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    const clientId = "22dbe7c6f0efc098e2f7fcd62476f4a2"; // 카카오 REST API 키
    const redirectUri = "http://localhost:5173/oauth/callback/kakao"; // 설정한 Redirect URI
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 리다이렉트
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ textAlign: "center", maxWidth: 400, padding: "20px", border: "1px solid #f0f0f0", borderRadius: 8 }}>
        <Title level={2}>Login</Title>
        <Paragraph>로그인을 진행하려면 아래 버튼을 클릭하세요.</Paragraph>
        <Button type="primary" block onClick={handleLogin}>
          Kakao Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;

