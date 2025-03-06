
import axios from 'axios';

export const checkForDuplicateEmail = async (email: string) => {
  try {
    const response = await axios.get(`http://localhost:3002/users?email=${email}`);
    return response.data.length > 0; 
  } catch (error) {
    console.error('Error checking for duplicate email:', error);
    return false;
  }
};


export const checkForDuplicateContact = async (contact: string) => {
  try {
    const response = await axios.get(`http://localhost:3002/users?contact=${contact}`);
    return response.data.length > 0; 
  } catch (error) {
    console.error('Error checking for duplicate contact:', error);
    return false;
  }
};