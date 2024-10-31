'use client';
import { decodedToken } from '@/utils/jwt/jwt';
import { strict } from 'assert';
import { JwtPayload } from 'jwt-decode';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // On initial load, check if user is already logged in
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      const decodedData: JwtPayload & { role: any } = decodedToken(authToken);
      const userInfo: any = {
         ...decodedData,
         role: decodedData.role?.toLowerCase() || '',
      };
      setUser(userInfo);
  }}, []);

  const login = (user: string) => {
    // Set the user state immediately and store in localStorage
    localStorage.setItem('accessToken', user);
    setUser(user); // This triggers immediate re-render of components depending on this state
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
