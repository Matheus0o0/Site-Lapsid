"use client";
import { useEffect, useState } from 'react';
import { getIntegrantes, createIntegrante, updateIntegrante, deleteIntegrante } from '@/services/integranteEquipeService';
import { getEquipes } from '@/services/equipeService';
import { IntegranteEquipe } from '@/types/IntegranteEquipe';
import { Equipe } from '@/types/Equipe';
import styles from './Integrantes.module.css';

export default function Integrantes() {
  const [integrantes, setIntegrantes] = useState<IntegranteEquipe[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaImagem, setNovaImagem] = useState('');
  const [novaEquipeId, setNovaEquipeId] = useState<number | ''>('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setIsLoading(true);
      const [integrantesData, equipesData] = await Promise.all([
        getIntegrantes(),
        getEquipes()
      ]);
      setIntegrantes(integrantesData);
      setEquipes(equipesData);
      setError(null);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate() {
    if (!novaEquipeId) {
      alert('Selecione uma equipe');
      return;
    }

    try {
      const novoIntegrante = { 
        nome: novoNome, 
        email: novoEmail, 
        imagem: novaImagem,
        equipe: novaEquipeId
      };
      await createIntegrante(novoIntegrante);
      setNovoNome('');
      setNovoEmail('');
      setNovaImagem('');
      setNovaEquipeId('');
      fetchData();
    } catch {
      alert('Erro ao criar integrante');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão do integrante?')) return;
    try {
      await deleteIntegrante(id);
      fetchData();
    } catch {
      alert('Erro ao deletar integrante');
    }
  }

  if (isLoading) return <div>Carregando dados...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Integrantes da Equipe</h1>

      <div className={styles.formContainer}>
        <h2>Novo Integrante</h2>
        <input 
          className={styles.input}
          placeholder="Nome" 
          value={novoNome} 
          onChange={e => setNovoNome(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Email" 
          value={novoEmail} 
          onChange={e => setNovoEmail(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="URL da Imagem" 
          value={novaImagem} 
          onChange={e => setNovaImagem(e.target.value)} 
        />
        <select 
          className={styles.select}
          value={novaEquipeId}
          onChange={e => setNovaEquipeId(Number(e.target.value))}
        >
          <option value="">Selecione uma equipe</option>
          {equipes.map(equipe => (
            <option key={equipe.id} value={equipe.id}>
              {equipe.nome}
            </option>
          ))}
        </select>
        <button className={styles.button} onClick={handleCreate}>Criar</button>
      </div>

      <div className={styles.listContainer}>
        {integrantes.map(integrante => (
          <div key={integrante.id} className={styles.card}>
            {integrante.imagem && (
              <img src={integrante.imagem} alt={integrante.nome} className={styles.image} />
            )}
            <h3>{integrante.nome}</h3>
            <p>{integrante.email}</p>
            <p className={styles.equipe}>
              Equipe: {equipes.find(e => e.id === integrante.equipe)?.nome}
            </p>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(integrante.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 