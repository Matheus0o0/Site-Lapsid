"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/Auth';
import { useRouter } from 'next/navigation';
import style from '../../Style/AdminPages.module.css';
import { getProjetos, deleteProjeto, Projeto } from '@/services/projetoService';

export default function Projetos() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchProjetos = async () => {
      try {
        setLoading(true);
        const data = await getProjetos();
        setProjetos(data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar projetos:', err);
        setError(err.message || 'Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, [isAdmin, user, router]);

  const handleDelete = async (id: number) => {
    if (!user) return;

    if (!window.confirm('Tem certeza que deseja excluir este projeto?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deleteProjeto(id);
      setProjetos(projetos.filter(p => p.id !== id));
      setError(null);
    } catch (err: any) {
      console.error('Erro ao excluir projeto:', err);
      setError(err.message || 'Erro ao excluir projeto');
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
        <div className={style.loading}>Carregando projetos...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Gerenciar Projetos</h1>
        <p>Área exclusiva para administradores</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <button 
        className={style.createButton}
        onClick={() => router.push('/Admin/Projetos/criar')}
      >
        Adicionar Novo Projeto
      </button>

      <div className={style.content}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Imagem</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map(projeto => (
              <tr key={projeto.id}>
                <td>{projeto.titulo}</td>
                <td>{projeto.autor || 'Não informado'}</td>
                <td>
                  {projeto.imagem ? (
                    <div style={{ width: '50px', height: '30px', overflow: 'hidden', borderRadius: '4px' }}>
                      <img 
                        src={projeto.imagem} 
                        alt={projeto.titulo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>Sem imagem</span>
                  )}
                </td>
                <td>{formatarData(projeto.data_criacao)}</td>
                <td className={style.actions}>
                  <button 
                    className={style.editButton}
                    onClick={() => router.push(`/Admin/Projetos/editar/${projeto.id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`${style.deleteButton} ${deleteLoading === projeto.id ? style.buttonLoading : ''}`}
                    onClick={() => handleDelete(projeto.id)}
                    disabled={deleteLoading === projeto.id}
                  >
                    {deleteLoading === projeto.id ? 'Excluindo...' : 'Excluir'}
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
          Apenas administradores podem gerenciar projetos do sistema.
        </p>
      </div>
    </div>
  );
}
