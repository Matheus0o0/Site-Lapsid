"use client";
import { useEffect, useState } from 'react';
import { getEquipes, createEquipe, updateEquipe, deleteEquipe } from '@/services/equipeService';
import { Equipe } from '@/types/Equipe';
import styles from './Equipes.module.css';

export default function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState('');
  const [novoTipoIntegrante, setNovoTipoIntegrante] = useState('');
  const [novoCurso, setNovoCurso] = useState('');
  const [novaLinhaPesquisa, setNovaLinhaPesquisa] = useState('');
  const [novaTitulacaoMaxima, setNovaTitulacaoMaxima] = useState('');

  useEffect(() => {
    fetchEquipes();
  }, []);

  async function fetchEquipes() {
    try {
      setIsLoading(true);
      const data = await getEquipes();
      setEquipes(data);
      setError(null);
    } catch {
      setError('Erro ao carregar equipes');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate() {
    try {
      const novaEquipe = { 
        nome: novoNome,
        tipo_integrante: novoTipoIntegrante,
        curso: novoCurso,
        linha_pesquisa: novaLinhaPesquisa,
        titulacao_maxima: novaTitulacaoMaxima
      };
      await createEquipe(novaEquipe);
      setNovoNome('');
      setNovoTipoIntegrante('');
      setNovoCurso('');
      setNovaLinhaPesquisa('');
      setNovaTitulacaoMaxima('');
      fetchEquipes();
    } catch {
      alert('Erro ao criar equipe');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão da equipe?')) return;
    try {
      await deleteEquipe(id);
      fetchEquipes();
    } catch {
      alert('Erro ao deletar equipe');
    }
  }

  if (isLoading) return <div>Carregando equipes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Equipes</h1>

      <div className={styles.formContainer}>
        <h2>Nova Equipe</h2>
        <input 
          className={styles.input}
          placeholder="Nome" 
          value={novoNome} 
          onChange={e => setNovoNome(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Tipo de Integrante" 
          value={novoTipoIntegrante} 
          onChange={e => setNovoTipoIntegrante(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Curso" 
          value={novoCurso} 
          onChange={e => setNovoCurso(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Linha de Pesquisa" 
          value={novaLinhaPesquisa} 
          onChange={e => setNovaLinhaPesquisa(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Titulação Máxima" 
          value={novaTitulacaoMaxima} 
          onChange={e => setNovaTitulacaoMaxima(e.target.value)} 
        />
        <button className={styles.button} onClick={handleCreate}>Criar</button>
      </div>

      <div className={styles.listContainer}>
        {equipes.map(equipe => (
          <div key={equipe.id} className={styles.card}>
            <h3>{equipe.nome}</h3>
            <p><strong>Tipo:</strong> {equipe.tipo_integrante}</p>
            <p><strong>Curso:</strong> {equipe.curso}</p>
            <p><strong>Linha de Pesquisa:</strong> {equipe.linha_pesquisa}</p>
            {equipe.titulacao_maxima && (
              <p><strong>Titulação Máxima:</strong> {equipe.titulacao_maxima}</p>
            )}
            {equipe.data_inclusao && (
              <p><strong>Data de Inclusão:</strong> {new Date(equipe.data_inclusao).toLocaleDateString()}</p>
            )}
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(equipe.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 