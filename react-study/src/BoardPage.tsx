import React, { useEffect, useState } from "react";
import { Layout, Table, Typography, Spin, message } from "antd";
import axios from "axios";

const { Content, Footer } = Layout;
const { Title } = Typography;

interface BoardData {
  key: string;
  title: string;
  author: string;
  date: string;
}

const BoardPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<BoardData[]>([]); // 테이블 데이터
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // 서버에서 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/board"); // API 엔드포인트
      const data = response.data.map((item: any, index: number) => ({
        key: index.toString(),
        title: item.title,
        author: item.author,
        date: item.date,
      }));
      setDataSource(data); // 데이터 설정
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("게시판 데이터를 가져오는데 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchData();
  }, []);

  // 테이블 컬럼 정의
  const columns = [
    { title: "제목", dataIndex: "title", key: "title" },
    { title: "작성자", dataIndex: "author", key: "author" },
    { title: "작성일", dataIndex: "date", key: "date" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Title level={2}>게시판</Title>
        {loading ? (
          <Spin size="large" /> // 로딩 스피너 표시
        ) : (
          <Table dataSource={dataSource} columns={columns} />
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 My App. All Rights Reserved.</Footer>
    </Layout>
  );
};

export default BoardPage;
