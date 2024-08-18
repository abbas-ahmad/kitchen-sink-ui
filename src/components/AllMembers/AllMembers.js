import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllMembers.css';

const AllMembers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/members')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
    <header className="app-header">
    <h1>
        <Link to="/">Kitchen Sink App</Link>
    </h1>
    </header>
    <div className="all-members-container">
      <h2>All Members:</h2>
      <div className="user-list-content">
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </div>
    </div>
  );
};

export default AllMembers;