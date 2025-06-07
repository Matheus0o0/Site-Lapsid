const API_URL = process.env.NEXT_PUBLIC_API_URL?.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL
  : (process.env.NEXT_PUBLIC_API_URL ?? '') + '/';

import { Relatorio } from '@/types/Relatorio';

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

export async function getRelatorios(): Promise<Relatorio[]> {
  const response = await fetch(`${API_URL}relatorio/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar relatórios');
  }
  return response.json();
}

export async function createRelatorio(relatorio: Partial<Relatorio>): Promise<Relatorio> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}relatorio/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(relatorio),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao criar relatório');
  }
  return response.json();
}

export async function updateRelatorio(id: number, relatorio: Partial<Relatorio>): Promise<Relatorio> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}relatorio/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(relatorio),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar relatório');
  }
  return response.json();
}

export async function deleteRelatorio(id: number): Promise<void> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}relatorio/${id}/`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': csrfToken || '',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar relatório');
  }
}
