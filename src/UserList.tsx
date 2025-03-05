import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './types';
import { useNavigate } from 'react-router-dom';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://your-json-server.onrender.com/users');
        
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3002/users/${id}`);
      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert('are you sure you want to delete this user?!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="card bg-base-200 shadow-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">User List (JSON Format)</h2>
      <div className="overflow-x-auto">
        <pre className="bg-base-100 p-4 rounded-lg">
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>
      <div className="mt-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Home Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.contact}</td>
                <td>{user.email}</td>
                <td>{user.homeAddress}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id!)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserList;