const API_URL = process.env.NEXT_PUBLIC_API_URL?.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL
  : (process.env.NEXT_PUBLIC_API_URL ?? '') + '/';

import { ConteudoPagina } from '@/types/ConteudoPagina';

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

export async function getConteudos(): Promise<ConteudoPagina[]> {
  const response = await fetch(`${API_URL}conteudo-paginas/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar conteúdos');
  }
  return response.json();
}

export async function createConteudo(conteudo: Partial<ConteudoPagina>): Promise<ConteudoPagina> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}conteudo-paginas/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(conteudo),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao criar conteúdo');
  }
  return response.json();
}

export async function updateConteudo(id: number, conteudo: Partial<ConteudoPagina>): Promise<ConteudoPagina> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}conteudo-paginas/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(conteudo),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar conteúdo');
  }
  return response.json();
}

export async function deleteConteudo(id: number): Promise<void> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}conteudo-paginas/${id}/`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': csrfToken || '',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar conteúdo');
  }
}
