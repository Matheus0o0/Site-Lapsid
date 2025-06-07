"use client";
import { useEffect, useState } from 'react';
import { getConteudos, createConteudo, updateConteudo, deleteConteudo } from '@/services/conteudoPaginaService';
import { ConteudoPagina } from '@/types/ConteudoPagina';
import styles from './Conteudos.module.css';

export default function Conteudos() {
  const [conteudos, setConteudos] = useState<ConteudoPagina[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [novaPagina, setNovaPagina] = useState('');
  const [novaSecao, setNovaSecao] = useState('');

  useEffect(() => {
    fetchConteudos();
  }, []);

  async function fetchConteudos() {
    try {
      setIsLoading(true);
      const data = await getConteudos();
      setConteudos(data);
      setError(null);
    } catch {
      setError('Erro ao carregar conteúdos');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate() {
    try {
      const novoConteudoPagina = { 
        titulo: novoTitulo, 
        conteudo: novoConteudo, 
        pagina: novaPagina,
        secao: novaSecao
      };
      await createConteudo(novoConteudoPagina);
      setNovoTitulo('');
      setNovoConteudo('');
      setNovaPagina('');
      setNovaSecao('');
      fetchConteudos();
    } catch {
      alert('Erro ao criar conteúdo');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão do conteúdo?')) return;
    try {
      await deleteConteudo(id);
      fetchConteudos();
    } catch {
      alert('Erro ao deletar conteúdo');
    }
  }

  if (isLoading) return <div>Carregando conteúdos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Conteúdos de Página</h1>

      <div className={styles.formContainer}>
        <h2>Novo Conteúdo</h2>
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
          placeholder="Página" 
          value={novaPagina} 
          onChange={e => setNovaPagina(e.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Seção" 
          value={novaSecao} 
          onChange={e => setNovaSecao(e.target.value)} 
        />
        <button className={styles.button} onClick={handleCreate}>Criar</button>
      </div>

      <div className={styles.listContainer}>
        {conteudos.map(conteudo => (
          <div key={conteudo.id} className={styles.card}>
            <h3>{conteudo.titulo}</h3>
            <p>{conteudo.conteudo}</p>
            <div className={styles.meta}>
              <span>Página: {conteudo.pagina}</span>
              <span>Seção: {conteudo.secao}</span>
            </div>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(conteudo.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 