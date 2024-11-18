// components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
    console.log("aquitoy");
    
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
