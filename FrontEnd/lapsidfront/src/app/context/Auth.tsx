"use client";

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api').replace(/\/$/, '');

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const getCSRFToken = async () => {
    try {
      const csrfUrl = `${API_URL}/csrf`;
      console.log('Fetching CSRF token from:', csrfUrl);

      const response = await fetch(csrfUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Falha ao obter token CSRF: ${response.status}`);
      }

      const csrfToken = response.headers.get('X-CSRFToken');
      if (!csrfToken) {
        throw new Error('Token CSRF não encontrado na resposta do servidor');
      }

      return csrfToken;
    } catch (error) {
      console.error('Erro ao obter CSRF token:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const csrfToken = await getCSRFToken();
      
      const loginUrl = `${API_URL}/login`;
      console.log('Attempting login at:', loginUrl);

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Email ou senha inválidos');
        }
        throw new Error(errorData.error || 'Erro ao fazer login');
      }

      const userData = await response.json();
      
      if (!userData || !userData.id || !userData.role) {
        throw new Error('Resposta inválida do servidor: dados do usuário incompletos');
      }

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      if (userData.role === 'admin') {
        router.push('/Admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const csrfToken = await getCSRFToken();
      
      const logoutUrl = `${API_URL}/logout`;
      console.log('Attempting logout at:', logoutUrl);

      const response = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer logout');
      }

      setUser(null);
      localStorage.removeItem('user');
      router.push('/Login');
    } catch (error) {
      console.error('Erro no logout:', error);
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
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 