import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  FaHome,
  FaCalendarAlt,
  FaUserFriends,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from 'react-icons/fa';
import './../css/Dashboard.css';

interface User {
  _id: string;
  email: string;
  avatar: string;
  name: string;
  accessToken: string;
}

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userParam = params.get('user');

    // console.log(params, token, userParam);

    if (token && userParam) {
      try {
        const userData: User = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        navigate('/login');
      } else {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    }

    setLoading(false); // End loading
  }, [location.search, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const navItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Home' },
    {
      path: '/dashboard/reminders',
      icon: <FaCalendarAlt />,
      label: 'Reminders',
    },
    { path: '/dashboard/contacts', icon: <FaUserFriends />, label: 'Contacts' },
    {
      path: '/dashboard/notifications',
      icon: <FaBell />,
      label: 'Notifications',
    },
    { path: '/dashboard/settings', icon: <FaCog />, label: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Nav Toggle */}
      <motion.button
        className="mobile-nav-toggle"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={isMobileNavOpen ? 'open' : 'closed'}
          variants={{
            closed: { rotate: 0 },
            open: { rotate: 90 },
          }}
        >
          ☰
        </motion.div>
      </motion.button>

      {/* Side Navigation */}
      <motion.aside
        className="side-nav"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="nav-header">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <i className="fas fa-birthday-cake logo-icon"></i>
          </motion.div>
          <h2>Birthday Reminder</h2>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
            >
              <motion.div
                className={`nav-item ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="nav-icon">{item.icon}</div>
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </nav>

        <motion.div
          className="nav-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </motion.div>
      </motion.aside>

      {/* Mobile Navigation (Overlay) */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mobile-nav-content">
              {navItems.map((item) => (
                <Link
                  to={item.path}
                  key={item.path}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <motion.div
                    className={`mobile-nav-item ${
                      location.pathname === item.path ? 'active' : ''
                    }`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="mobile-nav-icon">{item.icon}</div>
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <motion.header
          className="dashboard-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="header-left">
            <h1>
              {navItems.find((item) => item.path === location.pathname)
                ?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="header-right">
            <motion.div
              className="notification-bell"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaBell />
              <span className="notification-badge">3</span>
            </motion.div>
            {user && (
              <div className="user-profile">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="avatar"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/40';
                  }}
                />
                <span>{user.name}</span>
              </div>
            )}
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          className="dashboard-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Outlet />
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
