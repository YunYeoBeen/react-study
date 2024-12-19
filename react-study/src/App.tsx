import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import BoardPage from "./BoardPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage />} />
        {/* 게시판 페이지 */}
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
