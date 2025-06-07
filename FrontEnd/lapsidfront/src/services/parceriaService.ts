import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

export interface Parceria {
  id: number;
  titulo: string;
  conteudo: string;
  data_criacao: string;
  data_atualizacao: string;
}

export async function getParcerias(): Promise<Parceria[]> {
  try {
    const response = await axios.get(`${API_URL}/parcerias/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar parcerias:', error);
    throw new Error('Erro ao buscar parcerias');
  }
}

export async function createParceria(parceria: Omit<Parceria, 'id'>): Promise<Parceria> {
  try {
    const response = await axios.post(`${API_URL}/parcerias/`, parceria);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao criar parceria:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao criar parceria');
    }
    throw new Error('Erro ao criar parceria');
  }
}

export async function updateParceria(id: number, parceria: Partial<Parceria>): Promise<Parceria> {
  try {
    const response = await axios.put(`${API_URL}/parcerias/${id}/`, parceria);
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
    await axios.delete(`${API_URL}/parcerias/${id}/`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao deletar parceria:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao deletar parceria');
    }
    throw new Error('Erro ao deletar parceria');
  }
}
