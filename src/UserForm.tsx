import React, { useState } from 'react';
import axios from 'axios';
import { User } from './types';
import { useNavigate } from 'react-router-dom';
import { checkForDuplicateEmail, checkForDuplicateContact } from './utils/validation';

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    homeAddress: '',
  });

  const [errors, setErrors] = useState<Partial<User>>({}); // To store duplicate errors
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when the user types
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicate email
    const isDuplicateEmail = await checkForDuplicateEmail(formData.email);
    if (isDuplicateEmail) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exists' }));
      return;
    }

    // Check for duplicate contact
    const isDuplicateContact = await checkForDuplicateContact(formData.contact);
    if (isDuplicateContact) {
      setErrors((prevErrors) => ({ ...prevErrors, contact: 'Contact already exists' }));
      return;
    }

    // If no duplicates, submit the form
    try {
      await axios.post('http://localhost:3002/users', formData);
      alert('User added successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        homeAddress: '',
      }); // Clear form
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="card bg-base-200 shadow-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add User</h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          {/* First Name */}
          <div className="form-control flex-col">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-control flex-col">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Contact */}
          <div className="form-control flex-col">
            <label className="label">
              <span className="label-text">Contact</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            {errors.contact && (
              <span className="text-red-500 text-sm">{errors.contact}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-control flex-col">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Home Address */}
          <div className="form-control flex-col">
            <label className="label">
              <span className="label-text">Home Address</span>
            </label>
            <input
              type="text"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="btn btn-secondary"
            >
              View Users
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;