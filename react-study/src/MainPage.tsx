import React from "react";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph } = Typography;

const MainPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        {/* Logo */}
        <div className="logo">My App</div>
        {/* Menu */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} className="menu">
          <Menu.Item key="1">
            <Link to="/board">게시판</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Main</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <Title level={2}>Welcome to My App</Title>
            <Paragraph>Click "게시판" to visit the board page.</Paragraph>
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>©2024 My App. All Rights Reserved.</Footer>
    </Layout>
  );
};

export default MainPage;
