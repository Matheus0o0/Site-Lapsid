"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/Auth';
import { useRouter } from 'next/navigation';
import { getParcerias, deleteParceria, Parceria } from '@/services/parceriaService';
import style from '../../Style/AdminPages.module.css';

export default function Parcerias() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [parcerias, setParcerias] = useState<Parceria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchParcerias = async () => {
      try {
        setLoading(true);
        const data = await getParcerias();
        setParcerias(data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar parcerias:', err);
        setError(err.message || 'Erro ao carregar parcerias');
      } finally {
        setLoading(false);
      }
    };

    fetchParcerias();
  }, [isAdmin, user, router]);

  const handleDelete = async (id: number) => {
    if (!user) return;

    if (!window.confirm('Tem certeza que deseja excluir esta parceria?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deleteParceria(id);
      setParcerias(parcerias.filter(p => p.id !== id));
      setError(null);
    } catch (err: any) {
      console.error('Erro ao excluir parceria:', err);
      setError(err.message || 'Erro ao excluir parceria');
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
        <div className={style.loading}>Carregando parcerias...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Gerenciar Parcerias</h1>
        <p>Área exclusiva para administradores</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <button 
        className={style.createButton}
        onClick={() => router.push('/Admin/Parcerias/criar')}
      >
        Adicionar Nova Parceria
      </button>

      <div className={style.content}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Nome da Parceria</th>
              <th>Imagem</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {parcerias.map(parceria => (
              <tr key={parceria.id}>
                <td>{parceria.nome_parceria}</td>
                <td>
                  {parceria.imagem_url ? (
                    <div style={{ width: '50px', height: '30px', overflow: 'hidden', borderRadius: '4px' }}>
                      <img 
                        src={parceria.imagem_url} 
                        alt={parceria.nome_parceria}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>Sem imagem</span>
                  )}
                </td>
                <td>{formatarData(parceria.data_criacao)}</td>
                <td className={style.actions}>
                  <button 
                    className={style.editButton}
                    onClick={() => router.push(`/Admin/Parcerias/editar/${parceria.id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`${style.deleteButton} ${deleteLoading === parceria.id ? style.buttonLoading : ''}`}
                    onClick={() => handleDelete(parceria.id)}
                    disabled={deleteLoading === parceria.id}
                  >
                    {deleteLoading === parceria.id ? 'Excluindo...' : 'Excluir'}
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
          Apenas administradores podem gerenciar parcerias do sistema.
        </p>
      </div>
    </div>
  );
}