import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css'; 

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <header className="app-header">
        <h1>
          <Link to="/">Kitchen Sink App</Link>
        </h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
