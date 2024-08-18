import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/members')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/api/members/${id}`);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-list-container">
      <h2>All Members:</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button 
                  onClick={() => handleViewDetails(user.id)} 
                  className="view-details-btn"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from(Array(Math.ceil(users.length / usersPerPage)), (_, i) => (
          <button 
            key={i} 
            onClick={() => paginate(i + 1)} 
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Next
        </button>
      </div>
      <div className="see-all-users">
        <a href="/all-members">See all members</a>
      </div>
    </div>
  );
};

export default UserList;