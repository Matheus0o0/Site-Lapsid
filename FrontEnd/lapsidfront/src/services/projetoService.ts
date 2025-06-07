import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

export interface Projeto {
  id: number;
  titulo: string;
  conteudo: string;
  data_criacao: string;
  data_atualizacao: string;
}

export async function getProjetos(): Promise<Projeto[]> {
  try {
    const response = await axios.get(`${API_URL}/projetos/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw new Error('Erro ao buscar projetos');
  }
}

export async function createProjeto(projeto: Omit<Projeto, 'id'>): Promise<Projeto> {
  try {
    const response = await axios.post(`${API_URL}/projetos/`, projeto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao criar projeto:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao criar projeto');
    }
    throw new Error('Erro ao criar projeto');
  }
}

export async function updateProjeto(id: number, projeto: Partial<Projeto>): Promise<Projeto> {
  try {
    const response = await axios.put(`${API_URL}/projetos/${id}/`, projeto);
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
    await axios.delete(`${API_URL}/projetos/${id}/`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Erro ao deletar projeto:', error.response.data);
      throw new Error(error.response.data.message || 'Erro ao deletar projeto');
    }
    throw new Error('Erro ao deletar projeto');
  }
}
