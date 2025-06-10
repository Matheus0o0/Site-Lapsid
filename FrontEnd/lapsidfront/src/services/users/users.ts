import { api } from '../api';

export interface User {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'user';
  data_criacao: string;
}

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
};

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get('/usuarios/', getAuthHeaders());
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Você não tem permissão para acessar esta página.');
      }
      throw new Error('Erro ao buscar usuários');
    }
  },

  async getUser(id: number): Promise<User> {
    try {
      const response = await api.get(`/usuarios/${id}/`, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Você não tem permissão para acessar este usuário.');
      }
      throw new Error('Erro ao buscar usuário');
    }
  },

  async createUser(userData: Omit<User, 'id' | 'data_criacao'>): Promise<User> {
    try {
      const response = await api.post('/usuarios/', userData, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error.response?.data);
      if (error.response?.status === 403) {
        throw new Error('Você não tem permissão para criar usuários.');
      }
      if (error.response?.status === 400) {
        const errorMessage = error.response.data?.error || 'Dados inválidos';
        throw new Error(errorMessage);
      }
      throw new Error('Erro ao criar usuário');
    }
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put(`/usuarios/${id}/`, userData, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error.response?.data);
      if (error.response?.status === 403) {
        throw new Error('Você não tem permissão para atualizar este usuário.');
      }
      if (error.response?.status === 400) {
        const errorMessage = error.response.data?.error || 'Dados inválidos';
        throw new Error(errorMessage);
      }
      throw new Error('Erro ao atualizar usuário');
    }
  },

  async deleteUser(id: number, currentUserId: number): Promise<void> {
    try {
      if (id === currentUserId) {
        throw new Error('Você não pode excluir sua própria conta.');
      }

      const response = await api.delete(`/usuarios/${id}/`, getAuthHeaders());
      
      if (!response.status || response.status >= 400) {
        throw new Error(response.data?.error || 'Erro ao excluir usuário');
      }
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error.response?.data);
      if (error.response) {
        if (error.response.status === 403) {
          throw new Error(error.response.data?.error || 'Você não tem permissão para deletar usuários.');
        }
        throw new Error(error.response.data?.error || 'Erro ao excluir usuário');
      }
      throw new Error('Erro ao tentar excluir usuário. Por favor, tente novamente.');
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/usuarios/me/', getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Erro ao obter usuário atual:', error.response?.data);
      throw new Error('Erro ao obter usuário atual');
    }
  }
}; 