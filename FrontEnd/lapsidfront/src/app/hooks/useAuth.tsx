'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../services/api';
import { User } from '../../services/users/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/usuarios/me/');
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      
      if (response.data) {
        setUser(response.data);
        
        const userRole = response.data.role;
        if (userRole === 'admin') {
          router.replace('/Admin');
        } else {
          router.replace('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw new Error(error.response?.data?.message || 'Credenciais inválidas');
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');


      await api.post('/logout');
      
      router.push('/Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setUser(null);
      localStorage.removeItem('user');
      router.push('/Login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 