import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterForm from '../src/components/RegisterForm/RegisterForm';
import UserList from '../src/components/UserList/UserList';
import UserDetails from '../src/components/UserDetails/UserDetails';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <header className="app-header">
              <h1>Kitchen Sink App</h1>
            </header>
            <RegisterForm />
            <UserList users={users} />
          </>
        } />
        <Route path="/api/members/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);