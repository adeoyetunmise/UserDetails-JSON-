
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


