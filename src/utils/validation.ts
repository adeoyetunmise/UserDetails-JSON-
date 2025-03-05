// src/utils/validation.ts
import axios from 'axios';

// Check for duplicate email
export const checkForDuplicateEmail = async (email: string) => {
  try {
    const response = await axios.get(`http://localhost:3002/users?email=${email}`);
    return response.data.length > 0; // Return true if email already exists
  } catch (error) {
    console.error('Error checking for duplicate email:', error);
    return false;
  }
};

// Check for duplicate contact
export const checkForDuplicateContact = async (contact: string) => {
  try {
    const response = await axios.get(`http://localhost:3002/users?contact=${contact}`);
    return response.data.length > 0; // Return true if contact already exists
  } catch (error) {
    console.error('Error checking for duplicate contact:', error);
    return false;
  }
};