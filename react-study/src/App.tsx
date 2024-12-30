import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./main/MainPage";
import KakaoCallBack from "./Kakao/KakaoCallBack";
import { UserProvider } from "./contexts/UserContext"; // UserProvider import
import LoginPage from "./Kakao/LoginPage";


const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login/callback/kakao" element={<KakaoCallBack />} /> {/* 콜백 URL */}
          <Route path="/login" element={<LoginPage />} /> {/* 콜백 URL */}
        </Routes>
      </Router>
    </UserProvider>

  );
};

export default App;
