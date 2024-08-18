import React, { useState } from 'react';
import User from '../../models/user';
import './RegisterForm.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = new User(null, name, email, phoneNumber);
    try {
      const response = await fetch('http://localhost:8080/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setSuccess('Member registered successfully');
        setError(null);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.errors);
        setSuccess(null);
      }
    } catch (error) {
      setError('An error occurred while registering member');
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        className="form-input"
      />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="form-input"
      />
      <input
        type="tel"
        value={phoneNumber}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Phone"
        className="form-input"
      />
      <button type="submit" className="form-button">
        Register
      </button>
      {error && (
        <div style={{ color: 'red' }}>
          <h4>Validation Errors:</h4>
          <ul>
            {Object.keys(error).map((key) => (
              <li key={key}>{error[key]}</li>
            ))}
          </ul>
        </div>
      )}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default RegisterForm;