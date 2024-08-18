import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();

  // Use the id parameter here
  return <div>User Details for ID: {id}</div>;
};

export default UserDetails;