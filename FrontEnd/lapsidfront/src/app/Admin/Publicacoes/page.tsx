'use client';

import { useState, useEffect } from 'react';
import { getPublicacoes, deletePublicacao } from '@/services/publicacaoService';
import { Publicacao } from '@/services/publicacaoService';
import { useAuth } from '@/app/context/Auth';
import { useRouter } from 'next/navigation';
import style from '../../Style/AdminPages.module.css';

export default function PublicacoesPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchPublicacoes = async () => {
      try {
        setLoading(true);
        const data = await getPublicacoes();
        setPublicacoes(data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar publicações:', err);
        setError(err.message || 'Erro ao carregar publicações');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacoes();
  }, [isAdmin, user, router]);

  const handleDelete = async (id: number) => {
    if (!user) return;

    if (!window.confirm('Tem certeza que deseja excluir esta publicação?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deletePublicacao(id);
      setPublicacoes(publicacoes.filter(p => p.id !== id));
      setError(null);
    } catch (err: any) {
      console.error('Erro ao excluir publicação:', err);
      setError(err.message || 'Erro ao excluir publicação');
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
        <div className={style.loading}>Carregando publicações...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Gerenciar Publicações</h1>
        <p>Área exclusiva para administradores</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <button 
        className={style.createButton}
        onClick={() => router.push('/Admin/Publicacoes/criar')}
      >
        Adicionar Nova Publicação
      </button>

      <div className={style.content}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Link</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {publicacoes.map(publicacao => (
              <tr key={publicacao.id}>
                <td>{publicacao.titulo}</td>
                <td>{publicacao.autor || 'Não informado'}</td>
                <td>{publicacao.ano || 'Não informado'}</td>
                <td>
                  {publicacao.link ? (
                    <a 
                      href={publicacao.link.startsWith('http') ? publicacao.link : `https://${publicacao.link}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#0070f3', textDecoration: 'none' }}
                    >
                      Acessar
                    </a>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>Sem link</span>
                  )}
                </td>
                <td>{formatarData(publicacao.data_criacao)}</td>
                <td className={style.actions}>
                  <button 
                    className={style.editButton}
                    onClick={() => router.push(`/Admin/Publicacoes/editar/${publicacao.id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`${style.deleteButton} ${deleteLoading === publicacao.id ? style.buttonLoading : ''}`}
                    onClick={() => handleDelete(publicacao.id)}
                    disabled={deleteLoading === publicacao.id}
                  >
                    {deleteLoading === publicacao.id ? 'Excluindo...' : 'Excluir'}
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
          Apenas administradores podem gerenciar publicações do sistema.
        </p>
      </div>
    </div>
  );
} 