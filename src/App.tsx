import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/upload"
          element={<UploadPage />}
        /> */}
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
        <Route
          path="/dashboard"
          element={<Dashboard />}
        >
          <Route
            index
            element={<DashboardHome />}
          />
          <Route
            path="upload"
            element={<UploadPage />}
          />
          {/* <Route
          path='*'
          element={<DashboardHome />}
          /> */}
          {/* <Route
            path="reminders"
            element={<RemindersPage />}
          />
          <Route
            path="contacts"
            element={<ContactsPage />}
          />
          <Route
            path="notifications"
            element={<NotificationsPage />}
          />
          <Route
            path="settings"
            element={<SettingsPage />}
          /> */}
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
