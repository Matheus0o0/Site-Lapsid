"use client";
import { useEffect, useState } from 'react';
import { getNoticias, deleteNoticia } from '@/services/noticiaService';
import { Noticia } from '@/types/Noticia';
import { useAuth } from '@/app/context/Auth';
import { useRouter } from 'next/navigation';
import style from '../../Style/AdminPages.module.css';

export default function Noticias() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchNoticias = async () => {
      try {
        setLoading(true);
        const data = await getNoticias();
        setNoticias(data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar notícias:', err);
        setError(err.message || 'Erro ao carregar notícias');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [isAdmin, user, router]);

  const handleDelete = async (id: number) => {
    if (!user) return;

    if (!window.confirm('Tem certeza que deseja excluir esta notícia?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deleteNoticia(id);
      setNoticias(noticias.filter(n => n.id !== id));
      setError(null);
    } catch (err: any) {
      console.error('Erro ao excluir notícia:', err);
      setError(err.message || 'Erro ao excluir notícia');
    } finally {
      setDeleteLoading(null);
    }
  };

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

  if (loading) {
    return (
      <div className={style.pageContainer}>
        <div className={style.loading}>Carregando notícias...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Gerenciar Notícias</h1>
        <p>Área exclusiva para administradores</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <button 
        className={style.createButton}
        onClick={() => router.push('/Admin/noticias/criar')}
      >
        Adicionar Nova Notícia
      </button>

      <div className={style.content}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Imagem</th>
              <th>Data de Publicação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.titulo}</td>
                <td>
                  {noticia.imagem ? (
                    <div style={{ width: '50px', height: '30px', overflow: 'hidden', borderRadius: '4px' }}>
                      <img 
                        src={noticia.imagem} 
                        alt={noticia.titulo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>Sem imagem</span>
                  )}
                </td>
                <td>{formatarData(noticia.data_noticia || '')}</td>
                <td className={style.actions}>
                  <button 
                    className={style.editButton}
                    onClick={() => router.push(`/Admin/noticias/editar/${noticia.id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`${style.deleteButton} ${deleteLoading === noticia.id ? style.buttonLoading : ''}`}
                    onClick={() => handleDelete(noticia.id)}
                    disabled={deleteLoading === noticia.id}
                  >
                    {deleteLoading === noticia.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.infoMessage}>
        <p>
          <strong>Atenção:</strong> Esta é uma área restrita. 
          Apenas administradores podem gerenciar notícias do sistema.
        </p>
      </div>
    </div>
  );
} 