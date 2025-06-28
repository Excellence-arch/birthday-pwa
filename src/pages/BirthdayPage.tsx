import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBirthdayCake, FaSearch, FaPlus } from 'react-icons/fa';
import { useBirthdayStore } from '../store/birthday.store';
import './../css/BirthdayPage.css';

const Birthdays: React.FC = () => {
  const navigate = useNavigate();
  const {
    birthdays,
    upcomingBirthdays,
    otherBirthdays,
    loading,
    error,
    fetchBirthdays,
    searchBirthdays,
  } = useBirthdayStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBirthdays();
  }, [fetchBirthdays]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select(); // Optional: select existing text
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get filtered birthdays based on search term
  const filteredBirthdays = searchTerm
    ? searchBirthdays(searchTerm)
    : birthdays;
  const filteredUpcoming = upcomingBirthdays.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOthers = otherBirthdays.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !birthdays.length) {
    return (
      <motion.div
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading birthdays...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="error-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="error-content">
          <div className="error-icon">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          </div>
          <h3>Something went wrong</h3>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <button
              className="retry-btn"
              onClick={fetchBirthdays}
            >
              Retry
            </button>
            <button
              className="contact-support-btn"
              onClick={() =>
                (window.location.href = 'mailto:oladipupomichael9@gmail.com')
              }
            >
              Contact Support
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="birthdays-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="birthdays-header">
        <h1>Birthdays</h1>
        <div className="search-add-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search birthdays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="add-birthday-btn"
            onClick={() => navigate('/dashboard/add-birthday')}
          >
            <FaPlus /> Add Birthday
          </button>
        </div>
      </div>

      {filteredBirthdays.length === 0 ? (
        <div className="no-birthdays">
          <FaBirthdayCake size={48} />
          <p>No birthdays found</p>
          <button
            className="add-first-btn"
            onClick={() => navigate('/dashboard/add-birthday')}
          >
            Add Your First Birthday
          </button>
        </div>
      ) : (
        <>
          {filteredUpcoming.length > 0 && (
            <section className="birthday-section">
              <h2>Upcoming Birthdays</h2>
              <div className="birthday-grid">
                {filteredUpcoming.map((birthday) => (
                  <motion.div
                    key={birthday._id}
                    className="birthday-card upcoming"
                    whileHover={{ y: -5 }}
                    onClick={() =>
                      navigate(`/dashboard/birthdays/${birthday._id}`)
                    }
                  >
                    <div className="birthday-icon">
                      <FaBirthdayCake />
                    </div>
                    <div className="birthday-info">
                      <h3>{birthday.name}</h3>
                      <p>{formatDate(birthday.dob)}</p>
                      <p>{birthday.phone}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {filteredOthers.length > 0 && (
            <section className="birthday-section">
              <h2>All Birthdays</h2>
              <div className="birthday-grid">
                {filteredOthers.map((birthday) => (
                  <motion.div
                    key={birthday._id}
                    className="birthday-card"
                    whileHover={{ y: -5 }}
                    onClick={() =>
                      navigate(`/dashboard/birthdays/${birthday._id}`)
                    }
                  >
                    <div className="birthday-icon">
                      <FaBirthdayCake />
                    </div>
                    <div className="birthday-info">
                      <h3>{birthday.name}</h3>
                      <p>{formatDate(birthday.dob)}</p>
                      <p>{birthday.phone}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Birthdays;
