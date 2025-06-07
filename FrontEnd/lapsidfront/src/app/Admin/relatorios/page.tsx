"use client";
import { useEffect, useState } from 'react';
import { getRelatorios, createRelatorio, updateRelatorio, deleteRelatorio } from '@/services/relatorioService';
import { Relatorio } from '@/types/Relatorio';
import styles from './Relatorios.module.css';

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novoArquivo, setNovoArquivo] = useState('');

  useEffect(() => {
    fetchRelatorios();
  }, []);

  async function fetchRelatorios() {
    try {
      setIsLoading(true);
      const data = await getRelatorios();
      setRelatorios(data);
      setError(null);
    } catch {
      setError('Erro ao carregar relatórios');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate() {
    try {
      const novoRelatorio = { 
        titulo: novoTitulo, 
        conteudo: novoConteudo, 
        data: novaData,
        arquivo: novoArquivo
      };
      await createRelatorio(novoRelatorio);
      setNovoTitulo('');
      setNovoConteudo('');
      setNovaData('');
      setNovoArquivo('');
      fetchRelatorios();
    } catch {
      alert('Erro ao criar relatório');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão do relatório?')) return;
    try {
      await deleteRelatorio(id);
      fetchRelatorios();
    } catch {
      alert('Erro ao deletar relatório');
    }
  }

  if (isLoading) return <div>Carregando relatórios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Relatórios</h1>

      <div className={styles.formContainer}>
        <h2>Novo Relatório</h2>
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
        />
        <input 
          className={styles.input}
          type="date"
          value={novaData} 
          onChange={e => setNovaData(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="URL do Arquivo" 
          value={novoArquivo} 
          onChange={e => setNovoArquivo(e.target.value)} 
        />
        <button className={styles.button} onClick={handleCreate}>Criar</button>
      </div>

      <div className={styles.listContainer}>
        {relatorios.map(relatorio => (
          <div key={relatorio.id} className={styles.card}>
            <h3>{relatorio.titulo}</h3>
            <p>{relatorio.conteudo}</p>
            <div className={styles.meta}>
              <span>Data: {new Date(relatorio.data).toLocaleDateString()}</span>
              {relatorio.arquivo && (
                <a 
                  href={relatorio.arquivo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Baixar Arquivo
                </a>
              )}
            </div>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(relatorio.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 