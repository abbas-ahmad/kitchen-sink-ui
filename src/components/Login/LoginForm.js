import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Assuming you already have this

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);
        localStorage.setItem('token', data); // Store the JWT token
        setError(null); // Clear any previous error
        navigate('/'); // Redirect to the main page
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || 'Invalid credentials'); // Handle error
      }
    } catch (error) {
      setError('An error occurred during login'); // Catch and set any unexpected errors
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="login-button">Login</button>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <p>{error}</p>
        </div>
      )}
    </form>
  );
}

export default LoginPage;
