import React, { useEffect, type JSX } from 'react';
import { motion } from 'framer-motion';
import { FaBirthdayCake, FaGift, FaUserPlus } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { useDashboardStore } from './../store/dashboard.store';
import './../css/DashboardHome.css';

const iconMap: Record<string, JSX.Element> = {
  'Total Contacts': <FaUserPlus />,
  'Upcoming Events': <FiCalendar />,
  'Birthdays This Month': <FaBirthdayCake />,
  'Gifts Given': <FaGift />,
};

const DashboardHome: React.FC = () => {
  const {
    stats,
    upcomingEvents,
    recentActivity,
    fetchDashboard,
    loading,
    error,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h3>Error loading dashboard</h3>
        <p>{error.message}</p>
        <button
          onClick={fetchDashboard}
          className="retry-btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <motion.div
        className="stats-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {stats.length > 0 ? (
          stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div
                className="stat-icon"
                style={{
                  backgroundColor: ['#6e8efb', '#a777e3', '#ff7eb9', '#4acccd'][
                    index % 4
                  ],
                }}
              >
                {iconMap[stat.title] || <FaUserPlus />}
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-stats">
            <p>No statistics available</p>
          </div>
        )}
      </motion.div>

      <motion.section
        className="upcoming-events"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="section-header">
          <h3>Upcoming Birthdays</h3>
          <button className="view-all">View All</button>
        </div>
        <div className="events-list">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                className="event-card"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="event-date">
                  <span>{event.date}</span>
                  <small>{event.daysLeft} days</small>
                </div>
                <div className="event-details">
                  <h4>{event.name}</h4>
                  <p className="relation">{event.relation}</p>
                </div>
                <div className="event-actions">
                  <button className="remind-btn">Remind Me</button>
                  <button className="gift-btn">Gift Ideas</button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="empty-events">
              <div className="empty-icon">
                <FaBirthdayCake />
              </div>
              <h4>No upcoming birthdays</h4>
              <p>You don't have any birthdays coming up soon</p>
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        className="recent-activity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className="section-header">
          <h3>Recent Activity</h3>
        </div>
        <div className="activity-timeline">
          {recentActivity.length > 0 ? (
            recentActivity.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div
                  className="timeline-badge"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon === 'birthday' ? (
                    <FaBirthdayCake />
                  ) : item.icon === 'gift' ? (
                    <FaGift />
                  ) : (
                    <FiCalendar />
                  )}
                </div>
                <div className="timeline-content">
                  <p>{item.message}</p>
                  <small>{item.timeAgo}</small>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="empty-activity">
              <div className="empty-icon">
                <FiCalendar />
              </div>
              <h4>No recent activity</h4>
              <p>Your recent interactions will appear here</p>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default DashboardHome;
