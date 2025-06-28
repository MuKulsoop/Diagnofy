import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { apiService } from '../config/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        apiService.setToken(token);
        const userData = await apiService.getProfile();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiService.login(email, password);
    setUser(response.user);
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    const response = await apiService.register(userData);
    apiService.setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    apiService.clearToken();
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    const updatedUser = await apiService.updateProfile(userData);
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};