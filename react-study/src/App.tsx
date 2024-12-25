import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import MainPage from "./MainPage";
import KakaoCallback from "./KakaoCallBack";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login/oauth2/code/kakao" element={<KakaoCallback />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
