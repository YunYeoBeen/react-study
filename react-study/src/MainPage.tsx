import React from "react";
import { Layout, Button } from "antd";
import { useUser } from "./UserContext";

const { Header, Content, Footer } = Layout;

const MainPage: React.FC = () => {
  const { user } = useUser();

  const redirectToKakaoLogin = () => {
    const clientId = "6f47201bc042699a7bffec10c96e3327"; // Kakao REST API 키
    const redirectUri = "http://localhost:5173/login/oauth2/code/kakao"; // 프론트엔드 콜백 URI
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    // 카카오 로그인 페이지로 이동
    window.location.href = kakaoAuthUrl;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#001529",
          color: "#fff",
        }}
      >
        <div style={{ color: "#fff", fontSize: "18px" }}>My App</div>
        {user ? (
          <div style={{ color: "#fff" }}>환영합니다, {user.nickName}님!</div>
        ) : (
          <Button type="primary" onClick={redirectToKakaoLogin}>
            로그인
          </Button>
        )}
      </Header>
      <Content style={{ padding: "50px", textAlign: "center" }}>
        <h1>Welcome to My App</h1>
        <p>Ant Design과 Context를 사용한 데모 페이지입니다.</p>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 My App</Footer>
    </Layout>
  );
};

export default MainPage;
