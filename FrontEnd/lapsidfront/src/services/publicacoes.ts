const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export interface Publicacao {
  id: number;
  titulo: string;
  conteudo: string;
  autor: {
    id: number;
    nome: string;
  } | null;
  data_criacao: string;
  data_atualizacao: string;
  link: string;
  ano: string;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

export const publicacoesService = {
  async getPublicacoes(): Promise<Publicacao[]> {
    const response = await fetch(`${API_URL}publicacoes/`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Erro ao buscar publicações');
    }
    return response.json();
  },

  async createPublicacao(publicacao: Partial<Publicacao>): Promise<Publicacao> {
    const csrfToken = getCookie('csrftoken');

    const response = await fetch(`${API_URL}publicacoes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '',
      },
      body: JSON.stringify(publicacao),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Erro ao criar publicação');
    }
    return response.json();
  },

  async updatePublicacao(id: number, publicacao: Partial<Publicacao>): Promise<Publicacao> {
    const csrfToken = getCookie('csrftoken');

    const response = await fetch(`${API_URL}publicacoes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '',
      },
      body: JSON.stringify(publicacao),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar publicação');
    }
    return response.json();
  },

  async deletePublicacao(id: number): Promise<void> {
    const csrfToken = getCookie('csrftoken');

    const response = await fetch(`${API_URL}publicacoes/${id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': csrfToken || '',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar publicação');
    }
  }
}; 