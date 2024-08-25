import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllMembers.css';

const AllMembers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      try {
        const response = await fetch('http://localhost:8080/api/members', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.message || 'An error occurred while fetching users.');
        }
      } catch (error) {
        setError('An error occurred while fetching users.');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="all-members-container">
        <h2>All Members:</h2>
        <div className="user-list-content">
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <pre>{JSON.stringify(users, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMembers;
