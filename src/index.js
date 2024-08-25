import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm/RegisterForm';
import UserList from './components/UserList/UserList';
import UserDetails from './components/UserDetails/UserDetails';
import AllMembers from './components/AllMembers/AllMembers';
import LoginPage from './components/Login/LoginForm'; 
import Layout from './components/Layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<><RegisterForm /><UserList /></>} />
          <Route path="/api/members/:id" element={<UserDetails />} />
          <Route path="/all-members" element={<AllMembers />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
