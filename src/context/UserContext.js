import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig';

export const UserContext = createContext();


export const setItemWithExpiry = (key, value, expiryTime) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + expiryTime, // Tiempo de expiración en milisegundos
  };
  localStorage.setItem(key, JSON.stringify(item));
};


//componente proveedor
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //chequear si el usuario ya ha iniciado sesión
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
        //si hay un error al parsear el usuario, limpiar la sesión
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  //función para cerrar sesión
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
