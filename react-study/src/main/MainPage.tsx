import React from "react";
import { Layout, Typography, Calendar, Button } from "antd";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // React Context에서 사용자 정보 가져오기
import "./MainPageStyles.css";
import {TokenService} from "../contexts/TokenService";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainPage: React.FC = () => {
  const { user, setUser } = useUser(); // 사용자 정보와 상태 업데이트 함수 가져오기

  const handleLogout = () => {
    TokenService.clearTokens(); // 로컬스토리지에서 토큰 제거
    setUser(null); // 사용자 정보 초기화
    alert("로그아웃 되었습니다.");
  };

  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <div className="main-logo">SHARE WITH</div>
        <div className="user-section">
          {user ? (
            <>
              <span className="user-nickname">{user.nickName}님</span>
              <Button type="primary" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button type="primary">로그인</Button>
            </Link>
          )}
        </div>
      </Header>
      <Content className="main-content">
        <Title level={2}>캘린더</Title>
        <div className="calendar-container">
          <Calendar fullscreen={false} />
        </div>
      </Content>
      <Footer className="main-footer">©2024 My App</Footer>
    </Layout>
  );
};

export default MainPage;
