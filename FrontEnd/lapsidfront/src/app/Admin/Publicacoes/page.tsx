'use client';

import { useState, useEffect } from 'react';
import { getPublicacoes, createPublicacao, deletePublicacao } from '@/services/publicacaoService';
import { Publicacao } from '@/services/publicacaoService';
import styles from './Publicacoes.module.css';

export default function PublicacoesPage() {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [novoLink, setNovoLink] = useState('');
  const [novoAno, setNovoAno] = useState(new Date().getFullYear().toString());
  const [novoAutor, setNovoAutor] = useState('');

  const fetchPublicacoes = async () => {
    try {
      setLoading(true);
      const data = await getPublicacoes();
      setPublicacoes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar publicações');
      alert('Erro ao buscar publicações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicacoes();
  }, []);

  const handleCreate = async () => {
    try {
      let formattedLink = novoLink.trim();
      if (formattedLink && !formattedLink.startsWith('http://') && !formattedLink.startsWith('https://')) {
        formattedLink = `https://${formattedLink}`;
      }

      const novaPublicacao = {
        titulo: novoTitulo,
        conteudo: novoConteudo,
        link: formattedLink,
        ano: novoAno,
        autor: novoAutor
      };
      await createPublicacao(novaPublicacao);
      setNovoTitulo('');
      setNovoConteudo('');
      setNovoLink('');
      setNovoAno(new Date().getFullYear().toString());
      setNovoAutor('');
      fetchPublicacoes();
    } catch (err) {
      alert('Erro ao criar publicação');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta publicação?')) {
      return;
    }
    
    try {
      await deletePublicacao(id);
      fetchPublicacoes();
    } catch (err) {
      alert('Erro ao excluir publicação');
    }
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciar Publicações</h1>
      
      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Nova Publicação</h2>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Título"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Conteúdo"
            value={novoConteudo}
            onChange={(e) => setNovoConteudo(e.target.value)}
            className={styles.textarea}
          />
          <input
            type="text"
            placeholder="Link"
            value={novoLink}
            onChange={(e) => setNovoLink(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Ano"
            value={novoAno}
            onChange={(e) => setNovoAno(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Nome do Autor"
            value={novoAutor}
            onChange={(e) => setNovoAutor(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleCreate} className={styles.button}>
            Adicionar Publicação
          </button>
        </div>
      </div>

      <div className={styles.listContainer}>
        {publicacoes.map((publicacao) => (
          <div key={publicacao.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{publicacao.titulo}</h3>
              <p className={styles.cardDate}>
                {new Date(publicacao.data_criacao).toLocaleDateString()}
              </p>
              <p className={styles.cardContent}>{publicacao.conteudo}</p>
              {publicacao.link && (
                <a 
                  href={publicacao.link.startsWith('http') ? publicacao.link : `https://${publicacao.link}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                  onClick={(e) => {
                    e.preventDefault();
                    const url = publicacao.link.startsWith('http') ? publicacao.link : `https://${publicacao.link}`;
                    window.open(url, '_blank');
                  }}
                >
                  Acessar publicação
                </a>
              )}
            </div>
            <button
              onClick={() => handleDelete(publicacao.id)}
              className={styles.deleteButton}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 