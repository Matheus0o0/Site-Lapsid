const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

import { Noticia } from '@/types/Noticia';

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

export async function getNoticias(): Promise<Noticia[]> {
  const response = await fetch(`${API_URL}noticias/`);
  if (!response.ok) {
    throw new Error('Erro ao buscar notícias');
  }
  return response.json();
}

export async function createNoticia(noticia: Partial<Noticia>, imagem?: File): Promise<Noticia> {
  const csrfToken = getCookie('csrftoken');

  const { autor_id, ...noticiaData } = noticia;
  const noticiaToSend = {
    ...noticiaData,
    autor: autor_id
  };

  if (imagem) {
    const formData = new FormData();
    formData.append('imagem', imagem);
    
    Object.entries(noticiaToSend).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_URL}noticias/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken || '',
      },
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro detalhado:', errorData);
      throw new Error(errorData.detail || errorData.message || 'Erro ao criar notícia');
    }
    return response.json();
  }

  const response = await fetch(`${API_URL}noticias/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(noticiaToSend),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Erro detalhado:', errorData);
    throw new Error(errorData.detail || errorData.message || 'Erro ao criar notícia');
  }
  return response.json();
}

export async function updateNoticia(id: number, noticia: Partial<Noticia>, imagem?: File): Promise<Noticia> {
  const csrfToken = getCookie('csrftoken');

  const { autor_id, ...noticiaData } = noticia;
  const noticiaToSend = {
    ...noticiaData,
    autor: autor_id
  };

  if (imagem) {
    const formData = new FormData();
    formData.append('imagem', imagem);
    
    Object.entries(noticiaToSend).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_URL}noticias/${id}/`, {
      method: 'PUT',
      headers: {
        'X-CSRFToken': csrfToken || '',
      },
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'Erro ao atualizar notícia');
    }
    return response.json();
  }

  const response = await fetch(`${API_URL}noticias/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify(noticiaToSend),
    credentials: 'include',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || 'Erro ao atualizar notícia');
  }
  return response.json();
}

export async function deleteNoticia(id: number): Promise<void> {
  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}noticias/${id}/`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': csrfToken || '',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || 'Erro ao deletar notícia');
  }
}
