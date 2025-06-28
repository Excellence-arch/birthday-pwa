import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './../css/AuthPage.css';

interface AuthPageProps {
  type: 'login' | 'register';
}

const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      {/* Floating particles background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <motion.button
        className="back-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <FaArrowLeft />
      </motion.button>

      {/* Auth card */}
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo-wrapper">
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
            <FcGoogle
              className="google-logo"
              size={48}
            />
          </motion.div>
          <h1 className="auth-title">
            {type === 'login' ? 'Welcome Back' : 'Join Us'}
          </h1>
          <p className="auth-subtitle">
            {type === 'login'
              ? 'Sign in to manage your birthday reminders'
              : 'Create an account to get started'}
          </p>
        </div>

        <a href="https://birthday-ienx.onrender.com/api/auth/google">
          <motion.div
            className="google-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FcGoogle size={24} />
            <span>
              {type === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
            </span>
          </motion.div>
        </a>

        <div className="auth-footer">
          {type === 'login' ? (
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          ) : (
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
