import React, { useState, useEffect } from 'react';
import './UserList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const UserList = ({ users }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [userDetail, setUserDetail] = useState({});

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('https://localhost:8080/api/users');
      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetail = async (id) => {
    try {
      const response = await axios.get(`https://localhost:8080/api/users/${id}`);
      setUserDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-list-container">
      <Helmet>
        <title>Kitchen Sink App</title>
      </Helmet>
      <h2>All Members</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/${user.id}`} onClick={() => fetchUserDetail(user.id)}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="see-all-users">
        <a href="#" onClick={fetchAllUsers}>See all users</a>
        {allUsers.length > 0 && (
          <pre>
            <code>{JSON.stringify(allUsers, null, 2)}</code>
          </pre>
        )}
      </div>
      {Object.keys(userDetail).length > 0 && (
        <div className="user-detail">
          <h2>User Detail</h2>
          <pre>
            <code>{JSON.stringify(userDetail, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default UserList;