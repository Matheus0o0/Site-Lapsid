import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

// Configuração global do axios
axios.defaults.withCredentials = true;

export interface Parceria {
  id: number;
  nome_parceria: string;
  descricao: string;
  imagem_url?: string;
  data_criacao: string;
  data_atualizacao: string;
}

export type ParceriaInput = Omit<Parceria, 'id'>;

export async function getParcerias(): Promise<Parceria[]> {
  try {
    const response = await axios.get(`${API_URL}/parcerias/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken') || '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar parcerias:', error);
    throw new Error('Erro ao buscar parcerias');
  }
}

export async function createParceria(parceria: ParceriaInput | FormData): Promise<Parceria> {
  try {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      throw new Error('Token CSRF não encontrado');
    }

    const headers: Record<string, string> = {
      'X-CSRFToken': csrfToken,
    };

    if (!(parceria instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await axios.post(`${API_URL}/parcerias/`, parceria, {
      withCredentials: true,
      headers,
    });

    if (!response.data) {
      throw new Error('Resposta vazia do servidor');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao criar parceria:', error.response.data);
      const errorMessage = error.response.data.detail || error.response.data.message || 'Erro ao criar parceria';
      throw new Error(errorMessage);
    }
    throw new Error('Erro ao criar parceria');
  }
}

export async function updateParceria(id: number, parceria: Partial<Parceria> | FormData): Promise<Parceria> {
  try {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      throw new Error('Token CSRF não encontrado');
    }

    const headers: Record<string, string> = {
      'X-CSRFToken': csrfToken,
    };

    if (!(parceria instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await axios.put(`${API_URL}/parcerias/${id}/`, parceria, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao atualizar parceria:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao atualizar parceria');
    }
    throw new Error('Erro ao atualizar parceria');
  }
}

export async function deleteParceria(id: number): Promise<void> {
  try {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      throw new Error('Token CSRF não encontrado');
    }

    await axios.delete(`${API_URL}/parcerias/${id}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao deletar parceria:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao deletar parceria');
    }
    throw new Error('Erro ao deletar parceria');
  }
}
