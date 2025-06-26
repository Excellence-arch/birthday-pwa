import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/upload"
          element={<UploadPage />}
        />
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/login"
          element={<AuthPage type="login" />}
        />
        <Route
          path="/register"
          element={<AuthPage type="register" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
