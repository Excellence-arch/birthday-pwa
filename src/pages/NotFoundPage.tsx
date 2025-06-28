import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiHome, FiCompass, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './../css/NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  // Floating orb animations
  const floatingOrbs = Array.from({ length: 8 }).map((_, i) => {
    const size = Math.random() * 100 + 50;
    const delay = Math.random() * 2;
    return (
      <motion.div
        key={i}
        className="floating-orb"
        style={{
          background: `radial-gradient(circle, 
            rgba(${Math.floor(Math.random() * 100 + 155)}, 
            ${Math.floor(Math.random() * 100 + 155)}, 
            255, 0.7) 0%, 
            transparent 70%)`,
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 10,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  });

  return (
    <div className="not-found-container">
      {/* Floating orbs background */}
      <div className="orb-container">{floatingOrbs}</div>

      {/* Main content */}
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="error-icon"
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
          <FiAlertTriangle size={80} />
        </motion.div>

        <motion.h1
          className="error-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            4
          </motion.span>
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.2,
            }}
          >
            0
          </motion.span>
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.4,
            }}
          >
            4
          </motion.span>
        </motion.h1>

        <motion.p
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Oops! The page you're looking for has vanished into the digital void.
        </motion.p>

        <motion.div
          className="action-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button
            className="home-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHome /> Return Home
          </motion.button>
          <motion.button
            className="explore-button"
            onClick={() => navigate('/explore')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCompass /> Explore
          </motion.button>
        </motion.div>

        <motion.div
          className="contact-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <FiMail /> Need help?{' '}
          <motion.a
            href="mailto:oladipupomichael9@gmail.com"
            whileHover={{ color: '#6e8efb' }}
          >
            Contact us
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
