"use client";
import { useEffect, useState } from 'react';
import styles from './Parcerias.module.css';
import { useAuth } from '@/app/context/Auth';
import { getParcerias, createParceria, deleteParceria, Parceria } from '@/services/parceriaService';

export default function Parcerias() {
  const { user } = useAuth();
  const [parcerias, setParcerias] = useState<Parceria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [criarError, setCriarError] = useState<string | null>(null);

  useEffect(() => {
    fetchParcerias();
  }, []);

  async function fetchParcerias() {
    try {
      setIsLoading(true);
      const data = await getParcerias();
      setParcerias(data);
      setError(null);
    } catch (error) {
      setError('Erro ao carregar parcerias');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate() {
    if (!user) {
      setCriarError('Usuário não autenticado');
      return;
    }

    if (!novoTitulo.trim()) {
      setCriarError('O título é obrigatório');
      return;
    }

    if (!novoConteudo.trim()) {
      setCriarError('O conteúdo é obrigatório');
      return;
    }

    try {
      setCriarError(null);
      const novaParceria = {
        titulo: novoTitulo.trim(),
        conteudo: novoConteudo.trim(),
        data_criacao: new Date().toISOString(),
        data_atualizacao: new Date().toISOString()
      };
      await createParceria(novaParceria);
      setNovoTitulo('');
      setNovoConteudo('');
      fetchParcerias();
    } catch (error) {
      console.error('Erro ao criar parceria:', error);
      setCriarError(error instanceof Error ? error.message : 'Erro ao criar parceria');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão da parceria?')) return;
    try {
      await deleteParceria(id);
      fetchParcerias();
    } catch (error) {
      console.error('Erro ao deletar parceria:', error);
      alert(error instanceof Error ? error.message : 'Erro ao deletar parceria');
    }
  }

  function formatarData(data: string) {
    const date = new Date(data);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (isLoading) return <div>Carregando parcerias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Parcerias</h1>

      <div className={styles.formContainer}>
        <h2>Nova Parceria</h2>
        {criarError && (
          <div className={styles.error}>{criarError}</div>
        )}
        <input 
          className={styles.input}
          placeholder="Título" 
          value={novoTitulo} 
          onChange={e => setNovoTitulo(e.target.value)} 
        />
        <textarea
          className={styles.textarea}
          placeholder="Conteúdo"
          value={novoConteudo}
          onChange={e => setNovoConteudo(e.target.value)}
          rows={10}
        />
        <button className={styles.button} onClick={handleCreate}>Criar</button>
      </div>

      <div className={styles.listContainer}>
        {parcerias.map(parceria => (
          <div key={parceria.id} className={styles.card}>
            <h3>{parceria.titulo}</h3>
            <div className={styles.content}>{parceria.conteudo}</div>
            <div className={styles.dates}>
              <p>
                <strong>Data de Criação:</strong> {formatarData(parceria.data_criacao)}
              </p>
              <p>
                <strong>Data de Atualização:</strong> {formatarData(parceria.data_atualizacao)}
              </p>
            </div>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(parceria.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}