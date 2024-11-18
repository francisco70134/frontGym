// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  const login = (newToken, user) => {
    setToken(newToken);
    setUser(user);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
  
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
