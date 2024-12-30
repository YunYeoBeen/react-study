import React, { useState } from "react";
import { Layout, Typography, Space, Button, Modal } from "antd";
import KakaoLoginButton from "./KakaoLoginButton";
import "./LoginPageStyles.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout className="login-layout">
      <Header className="login-header">
        <div className="login-logo">SHARE WITH</div>
        <Button type="primary" onClick={showModal}>
          로그인
        </Button>
      </Header>
      <Content className="login-content">
        <Title level={2}>로그인을 진행하세요</Title>
      </Content>
      <Footer className="login-footer">©2024 My App</Footer>

      {/* 로그인 팝업 */}
      <Modal
        title="로그인"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Space direction="vertical" size="large" className="modal-content">
          <Title level={4}>카카오 로그인을 진행하세요</Title>
          <KakaoLoginButton />
          <Text type="secondary">
            로그인 버튼을 클릭하면 카카오 로그인 페이지로 이동합니다.
          </Text>
        </Space>
      </Modal>
    </Layout>
  );
};

export default LoginPage;
