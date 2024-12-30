import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Spin, Typography, Space, Card, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TokenService } from "../contexts/TokenService";

const { Title, Text } = Typography;

const KakaoCallBack: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // 알림 메시지
  const [alertType, setAlertType] = useState<"success" | "error" | undefined>(undefined); // 알림 유형

  useEffect(() => {
    const sendAuthCodeToServer = async () => {
      const currentUrl = window.location.href;
      const code = new URL(currentUrl).searchParams.get("code");

      if (!code) {
        console.error("로그인 실패: 인가 코드를 가져올 수 없습니다.");
        setAlertMessage("로그인 실패: 인가 코드를 가져올 수 없습니다.");
        setAlertType("error");
        setTimeout(() => navigate("/")); // 3초 후 메인 페이지로 이동
        return;
      }

      try {
        console.log("Sending auth code:", code);

        // 서버로 인가 코드 전송
        const response = await axios.post(
          "http://localhost:8080/auth/login/kakao",
          { code },
          { withCredentials: true }
        );

        console.log("Server Response:", response.data);

        const { nickName, accessToken, refreshToken } = response.data;
        // 토큰 저장
        TokenService.saveTokens(accessToken, refreshToken);

        // 사용자 정보 설정
        setUser({ nickName });

        setAlertMessage("로그인 성공! 메인 페이지로 이동합니다.");
        setAlertType("success");
        console.log(accessToken, refreshToken);
        setTimeout(() => {
          const cleanUrl = currentUrl.split("?")[0];
          window.history.replaceState(null, "", cleanUrl);
          navigate("/");
        }, 500); // 3초 후 메인 페이지로 이동
      } catch (error) {
        console.error("로그인 중 오류 발생:", error);
        setAlertMessage("로그인에 실패했습니다. 다시 시도해 주세요.");
        setAlertType("error");
        navigate("/"); // 3초 후 메인 페이지로 이동
      }
    };

    sendAuthCodeToServer();
  }, [setUser, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ width: 400, textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
        <Space direction="vertical" size="large">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          <Title level={4}>로그인 처리 중입니다...</Title>
          <Text type="secondary">
            카카오 로그인 중입니다. 잠시만 기다려 주세요.
          </Text>
          {alertMessage && (
            <Alert
              message={alertMessage}
              type={alertType}
              showIcon
              style={{ marginTop: 16 }}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default KakaoCallBack;
