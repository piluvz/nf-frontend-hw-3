
'use client'; 
import React, { createContext, useState, useContext, ReactNode } from 'react'; 
import { useRouter } from 'next/navigation';
import axios from 'axios';
 
interface AuthContextType { 
  token: string | null; 
  login: (username:string, password:string) => void; 
  logout: () => void; 
} 
 
const AuthContext = createContext<AuthContextType | undefined>(undefined); 
 
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => { 
  const [token, setToken] = useState<string | null>(null); 
  const router = useRouter();

  const login = async (username: string, password: string) => { 
    const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
    const {token} = response.data
    setToken(token); 
    router.push('/')
  }; 
 
  const logout = () => { 
    setToken(null); 
  }; 
 
  return ( 
    <AuthContext.Provider value={{ token, login, logout }}> 
      {children} 
    </AuthContext.Provider> 
  ); 
}; 
 
export const useAuth = () => { 
  const context = useContext(AuthContext); 
  if (context === undefined) { 
    throw new Error('useAuth must be used within an AuthProvider'); 
  } 
  return context; 
};