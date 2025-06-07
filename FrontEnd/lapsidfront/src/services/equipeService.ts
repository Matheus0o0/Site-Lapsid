const API_URL = process.env.NEXT_PUBLIC_API_URL?.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL
  : (process.env.NEXT_PUBLIC_API_URL ?? '') + '/';

import { Equipe } from '@/types/Equipe';

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

export async function getEquipes(): Promise<Equipe[]> {
  const response = await fetch(`${API_URL}equipe/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar equipes');
  }
  return response.json();
}

export async function createEquipe(equipe: Partial<Equipe>): Promise<Equipe> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}equipe/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(equipe),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao criar equipe');
  }
  return response.json();
}

export async function updateEquipe(id: number, equipe: Partial<Equipe>): Promise<Equipe> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}equipe/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(equipe),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar equipe');
  }
  return response.json();
}

export async function deleteEquipe(id: number): Promise<void> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}equipe/${id}/`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': csrfToken || '',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar equipe');
  }
}