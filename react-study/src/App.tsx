import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import KakaoCallback from "./KakaoCallBack";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<KakaoCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
