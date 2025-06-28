import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './../css/landingPage.css';

const LandingPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for user token and user data in localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!token && !!user);
  }, []);

  return (
    <div className="landing-container">
      {/* Background elements */}
      <div className="background-elements">
        <div className="decorative-blob blob-1"></div>
        <div className="decorative-blob blob-2"></div>
      </div>

      <div className="content-wrapper">
        <motion.div
          className="landing-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <header className="landing-header">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <i className="fas fa-birthday-cake logo-icon"></i>
            </motion.div>
            <motion.h1
              className="landing-title"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Birthday Reminder
            </motion.h1>
            <motion.p
              className="landing-subtitle"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Never miss important celebrations again
            </motion.p>
          </header>

          <motion.div
            className="landing-features"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <i className={`fas ${feature.icon} feature-icon`}></i>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="cta-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="cta-button primary"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go to Dashboard
                </motion.span>
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="cta-button primary"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.span>
                </Link>
                <Link
                  to="/login"
                  className="cta-button secondary"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.span>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.footer
        className="landing-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p>© {new Date().getFullYear()} Birthday Reminder</p>
      </motion.footer>
    </div>
  );
};

const features = [
  {
    icon: 'fa-bell',
    title: 'Smart Reminders',
    description: 'Get notified before special occasions',
  },
  {
    icon: 'fa-users',
    title: 'Contact Management',
    description: 'Organize all your important dates',
  },
  {
    icon: 'fa-file-csv',
    title: 'Easy Import',
    description: 'Upload your contacts via CSV',
  },
];

export default LandingPage;
