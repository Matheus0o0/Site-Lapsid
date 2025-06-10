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

export interface Projeto {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  imagem?: string;
  link?: string;
  data_criacao: string;
  data_atualizacao: string;
}

export type ProjetoInput = Omit<Projeto, 'id'>;

export async function getProjetos(): Promise<Projeto[]> {
  try {
    const response = await axios.get(`${API_URL}/projetos/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken') || '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw new Error('Erro ao buscar projetos');
  }
}

export async function createProjeto(projeto: ProjetoInput | FormData): Promise<Projeto> {
  try {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      throw new Error('Token CSRF não encontrado');
    }

    const headers: Record<string, string> = {
      'X-CSRFToken': csrfToken,
    };

    if (!(projeto instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await axios.post(`${API_URL}/projetos/`, projeto, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao criar projeto:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao criar projeto');
    }
    throw new Error('Erro ao criar projeto');
  }
}

export async function updateProjeto(id: number, projeto: Partial<Projeto> | FormData): Promise<Projeto> {
  try {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      throw new Error('Token CSRF não encontrado');
    }

    const headers: Record<string, string> = {
      'X-CSRFToken': csrfToken,
    };

    if (!(projeto instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await axios.put(`${API_URL}/projetos/${id}/`, projeto, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao atualizar projeto:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao atualizar projeto');
    }
    throw new Error('Erro ao atualizar projeto');
  }
}

export async function deleteProjeto(id: number): Promise<void> {
  try {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
      throw new Error('Token CSRF não encontrado');
    }

    await axios.delete(`${API_URL}/projetos/${id}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao deletar projeto:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao deletar projeto');
    }
    throw new Error('Erro ao deletar projeto');
  }
}
