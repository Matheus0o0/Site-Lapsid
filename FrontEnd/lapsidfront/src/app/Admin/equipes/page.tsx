"use client";
import { useEffect, useState } from 'react';
import { getEquipes, deleteEquipe } from '@/services/equipeService';
import { Equipe } from '@/types/Equipe';
import { useAuth } from '@/app/context/Auth';
import { useRouter } from 'next/navigation';
import style from '../../Style/AdminPages.module.css';

export default function Equipes() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchEquipes = async () => {
      try {
        setLoading(true);
        const data = await getEquipes();
        setEquipes(data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar equipes:', err);
        setError(err.message || 'Erro ao carregar equipes');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipes();
  }, [isAdmin, user, router]);

  const handleDelete = async (id: number) => {
    if (!user) return;

    if (!window.confirm('Tem certeza que deseja excluir esta equipe?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deleteEquipe(id);
      setEquipes(equipes.filter(e => e.id !== id));
      setError(null);
    } catch (err: any) {
      console.error('Erro ao excluir equipe:', err);
      setError(err.message || 'Erro ao excluir equipe');
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
        <div className={style.loading}>Carregando equipes...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Gerenciar Equipes</h1>
        <p>Área exclusiva para administradores</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <button 
        className={style.createButton}
        onClick={() => router.push('/Admin/equipes/criar')}
      >
        Adicionar Nova Equipe
      </button>

      <div className={style.content}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo de Integrante</th>
              <th>Curso</th>
              <th>Linha de Pesquisa</th>
              <th>Titulação Máxima</th>
              <th>Data de Inclusão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipes.map(equipe => (
              <tr key={equipe.id}>
                <td>{equipe.nome}</td>
                <td>{equipe.tipo_integrante || 'Não informado'}</td>
                <td>{equipe.curso || 'Não informado'}</td>
                <td>{equipe.linha_pesquisa || 'Não informado'}</td>
                <td>{equipe.titulacao_maxima || 'Não informado'}</td>
                <td>{equipe.data_inclusao ? formatarData(equipe.data_inclusao) : 'Não informado'}</td>
                <td className={style.actions}>
                  <button 
                    className={style.editButton}
                    onClick={() => router.push(`/Admin/equipes/editar/${equipe.id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`${style.deleteButton} ${deleteLoading === equipe.id ? style.buttonLoading : ''}`}
                    onClick={() => handleDelete(equipe.id)}
                    disabled={deleteLoading === equipe.id}
                  >
                    {deleteLoading === equipe.id ? 'Excluindo...' : 'Excluir'}
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
          Apenas administradores podem gerenciar equipes do sistema.
        </p>
      </div>
    </div>
  );
} 