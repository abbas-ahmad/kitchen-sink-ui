import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/members/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [id]);

  return (

    <div className="user-details-container">
      <header className="app-header">
    <h1>
        <Link to="/">Kitchen Sink App</Link>
    </h1>
    </header>
      {user && (
        <div className="user-details-content">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UserDetails;