"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api').replace(/\/$/, '');

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch (error) {
            console.error('Erro ao parsear usuário armazenado:', error);
            localStorage.removeItem('user');
          }
        }

        // Tenta verificar a autenticação com o backend
        try {
          const response = await axios.get(`${API_URL}/usuarios/me/`, {
            withCredentials: true,
            headers: {
              'X-CSRFToken': getCookie('csrftoken') || '',
            },
          });

          if (response.data) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        } catch (error) {
          // Se for erro 403, apenas limpa o usuário local
          if (axios.isAxiosError(error) && error.response?.status === 403) {
            setUser(null);
            localStorage.removeItem('user');
          }
          // Para outros erros, mantém o usuário local se existir
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Não limpa o usuário em caso de erro de rede
        if (axios.isAxiosError(error) && error.code !== 'ERR_NETWORK') {
          setUser(null);
          localStorage.removeItem('user');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const csrfToken = getCookie('csrftoken');
      if (!csrfToken) {
        throw new Error('Token CSRF não encontrado');
      }

      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        router.push(response.data.role === 'admin' ? '/Admin' : '/dashboard');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Email ou senha inválidos');
        }
        throw new Error(error.response?.data?.error || 'Erro ao fazer login');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      const csrfToken = getCookie('csrftoken');
      if (!csrfToken) {
        throw new Error('Token CSRF não encontrado');
      }

      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );

      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, limpa o estado local e redireciona
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
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