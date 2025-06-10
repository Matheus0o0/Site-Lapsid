const API_URL = process.env.NEXT_PUBLIC_API_URL?.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL
  : (process.env.NEXT_PUBLIC_API_URL ?? '') + '/';

import { IntegranteEquipe } from '@/types/IntegranteEquipe';

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

export async function getIntegrantes(): Promise<IntegranteEquipe[]> {
  const response = await fetch(`${API_URL}integrantes-equipe/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar integrantes');
  }
  return response.json();
}

export async function createIntegrante(integrante: Partial<IntegranteEquipe>): Promise<IntegranteEquipe> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}integrantes-equipe/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(integrante),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao criar integrante');
  }
  return response.json();
}

export async function updateIntegrante(id: number, integrante: Partial<IntegranteEquipe>): Promise<IntegranteEquipe> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}integrantes-equipe/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(integrante),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar integrante');
  }
  return response.json();
}

export async function deleteIntegrante(id: number): Promise<void> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}integrantes-equipe/${id}/`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': csrfToken || '',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar integrante');
  }
}

