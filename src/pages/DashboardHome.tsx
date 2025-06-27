import React from 'react';
import { motion } from 'framer-motion';
import { FaBirthdayCake, FaGift, FaUserPlus } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import './../css/DashboardHome.css';

const DashboardHome: React.FC = () => {
  // Sample data - replace with your actual data
  const upcomingEvents = [
    {
      id: 1,
      name: 'John Doe',
      date: 'May 15',
      daysLeft: 3,
      relation: 'Friend',
    },
    {
      id: 2,
      name: 'Jane Smith',
      date: 'May 18',
      daysLeft: 6,
      relation: 'Family',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      date: 'May 22',
      daysLeft: 10,
      relation: 'Colleague',
    },
  ];

  const stats = [
    {
      title: 'Total Contacts',
      value: 42,
      icon: <FaUserPlus />,
      color: '#6e8efb',
    },
    {
      title: 'Upcoming Events',
      value: 8,
      icon: <FiCalendar />,
      color: '#a777e3',
    },
    {
      title: 'Birthdays This Month',
      value: 5,
      icon: <FaBirthdayCake />,
      color: '#ff7eb9',
    },
  ];

  return (
    <div className="dashboard-home">
      
      {/* Stats Cards */}
      <motion.div
        className="stats-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        {stats.map((stat, index) => (
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
              style={{ backgroundColor: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Events */}
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
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
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
          ))}
        </div>
      </motion.section>

      {/* Recent Activity */}
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
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div
              className="timeline-badge"
              style={{ backgroundColor: '#ff7eb9' }}
            >
              <FaBirthdayCake />
            </div>
            <div className="timeline-content">
              <p>
                You added <strong>Sarah Williams</strong> to your contacts
              </p>
              <small>2 days ago</small>
            </div>
          </motion.div>
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div
              className="timeline-badge"
              style={{ backgroundColor: '#a777e3' }}
            >
              <FaGift />
            </div>
            <div className="timeline-content">
              <p>
                You saved a gift idea for <strong>Michael Brown</strong>
              </p>
              <small>5 days ago</small>
            </div>
          </motion.div>
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div
              className="timeline-badge"
              style={{ backgroundColor: '#6e8efb' }}
            >
              <FiCalendar />
            </div>
            <div className="timeline-content">
              <p>
                Birthday reminder sent for <strong>Emily Johnson</strong>
              </p>
              <small>1 week ago</small>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default DashboardHome;
