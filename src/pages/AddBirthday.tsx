import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBirthdayCake, FaArrowLeft, FaSave } from 'react-icons/fa';
import { useBirthdayStore } from '../store/birthday.store';
import './../css/AddBirthday.css';

const AddBirthday: React.FC = () => {
  const navigate = useNavigate();
  const { addBirthday } = useBirthdayStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      if (dobDate > today) {
        newErrors.dob = 'Date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await addBirthday({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        dob: formData.dob,
      });
      navigate('/dashboard/birthdays');
    } catch (error) {
      console.error('Error adding birthday:', error);
      setErrors((prev) => ({
        ...prev,
        form: 'Failed to save birthday. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="add-birthday-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="add-birthday-header">
        <button
          className="back-button"
          onClick={() => navigate('/dashboard/birthdays')}
        >
          <FaArrowLeft /> Back
        </button>
        <h1>
          <FaBirthdayCake className="header-icon" /> Add New Birthday
        </h1>
      </div>

      <motion.form
        className="birthday-form"
        onSubmit={handleSubmit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {errors.form && <div className="form-error">{errors.form}</div>}

        <div className={`form-group ${errors.name ? 'error' : ''}`}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className={`form-group ${errors.phone ? 'error' : ''}`}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className={`form-group ${errors.dob ? 'error' : ''}`}>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dob && <span className="error-message">{errors.dob}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Saving...'
            ) : (
              <>
                <FaSave /> Save Birthday
              </>
            )}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddBirthday;
