import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (reg_no, password) => {
    const response = await api.post('/auth/login', { reg_no, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data.user;
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
