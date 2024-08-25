import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // To handle any errors
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      try {
        const response = await fetch(`http://localhost:8080/api/members/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.message || 'An error occurred while fetching user details.');
        }
      } catch (error) {
        setError('An error occurred while fetching user details.');
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className="user-details-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div className="user-details-content">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UserDetails;