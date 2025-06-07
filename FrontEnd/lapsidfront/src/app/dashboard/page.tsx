'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/Auth';
import { useRouter } from 'next/navigation';
import styles from '../Style/Dashboard.module.css';
import { api } from '../../services/api';

interface Content {
  id: number;
  titulo: string;
  descricao: string;
  data_criacao?: string;
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [noticias, setNoticias] = useState<Content[]>([]);
  const [projetos, setProjetos] = useState<Content[]>([]);
  const [publicacoes, setPublicacoes] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/Login');
      return;
    }

    if (user?.role === 'admin') {
      router.replace('/Admin');
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      try {
        const [noticiasRes, projetosRes, publicacoesRes] = await Promise.all([
          api.get('/noticias/'),
          api.get('/projetos/'),
          api.get('/publicacoes/')
        ]);

        setNoticias(noticiasRes.data);
        setProjetos(projetosRes.data);
        setPublicacoes(publicacoesRes.data);
      } catch (err: any) {
        setError('Erro ao carregar conteúdo. Por favor, tente novamente mais tarde.');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isAuthenticated, user, router]);

  const handleEdit = async (type: string, id: number) => {
    router.push(`/${type}/${id}`);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Painel de Controle</h1>
      <p>Bem-vindo, {user?.nome}!</p>

      <section className={styles.section}>
        <h2>Notícias</h2>
        <div className={styles.contentGrid}>
          {noticias.map((noticia) => (
            <div key={noticia.id} className={styles.contentCard}>
              <h3>{noticia.titulo}</h3>
              <p>{noticia.descricao}</p>
              <button onClick={() => handleEdit('Noticias', noticia.id)}>
                Editar
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Projetos</h2>
        <div className={styles.contentGrid}>
          {projetos.map((projeto) => (
            <div key={projeto.id} className={styles.contentCard}>
              <h3>{projeto.titulo}</h3>
              <p>{projeto.descricao}</p>
              <button onClick={() => handleEdit('Projetos', projeto.id)}>
                Editar
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Publicações</h2>
        <div className={styles.contentGrid}>
          {publicacoes.map((publicacao) => (
            <div key={publicacao.id} className={styles.contentCard}>
              <h3>{publicacao.titulo}</h3>
              <p>{publicacao.descricao}</p>
              <button onClick={() => handleEdit('Publicacoes', publicacao.id)}>
                Editar
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 