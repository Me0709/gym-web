import React, { useState, useCallback } from 'react';
import type { User, AuthResponse, AppRole } from '../types/auth.types';
import { ROLES } from '../types/auth.types';
import { AuthContext } from './AuthContextDefinition';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('gym_user');
    const storedToken = localStorage.getItem('gym_token');
    
    if (storedUser && storedToken) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('gym_user');
        localStorage.removeItem('gym_token');
        return null;
      }
    }
    return null;
  });

  const [isLoading] = useState(false);

  const isValidRole = (role: string): role is AppRole => {
    return Object.values(ROLES).includes(role as AppRole);
  };

  const login = useCallback((response: AuthResponse) => {
    const validatedRoles = response.user.roles.filter(isValidRole);
    
    const validatedUser = {
        ...response.user,
        roles: validatedRoles
    };

    setUser(validatedUser);
    localStorage.setItem('gym_user', JSON.stringify(validatedUser));
    localStorage.setItem('gym_token', response.accessToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('gym_user');
    localStorage.removeItem('gym_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
