// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path based on your project structure

// Create the context
export const UserContext = createContext();


// sessionUtils.js o en un archivo de contexto
export const setItemWithExpiry = (key, value, expiryTime) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + expiryTime, // Tiempo de expiración en milisegundos
  };
  localStorage.setItem(key, JSON.stringify(item));
};


// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token and user on component mount
  useEffect(() => {
    const unparsedStoredUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (unparsedStoredUser && token) {
      try {
        const storedUser = JSON.parse(unparsedStoredUser);
        setUser(storedUser);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // If parsing fails, clear the corrupted data
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Logout function to clear session
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};
