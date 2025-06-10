'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/Auth';
import { useRouter } from 'next/navigation';
import style from '../../Style/AdminPages.module.css';
import { userService, User } from '../../../services/users/users';

export default function GerenciarUsuarios() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getUsers();
        setUsuarios(data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar usuários:', err);
        setError(err.message || 'Erro ao carregar usuários');
        if (err.message.includes('permissão')) {
          router.push('/dashboard');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin, user, router]);

  const handleDelete = async (id: number) => {
    if (!user) return;

    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await userService.deleteUser(id, user.id);
      setUsuarios(usuarios.filter(u => u.id !== id));
      setError(null);
    } catch (err: any) {
      console.error('Erro ao excluir usuário:', err);
      setError(err.message || 'Erro ao excluir usuário');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className={style.pageContainer}>
        <div className={style.loading}>Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Gerenciar Usuários</h1>
        <p>Área exclusiva para administradores</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <button 
        className={style.createButton}
        onClick={() => router.push('/Admin/usuarios/criar')}
      >
        Adicionar Novo Usuário
      </button>

      <div className={style.content}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id} className={usuario.id === user?.id ? style.currentUser : ''}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.role === 'admin' ? 'Administrador' : 'Usuário'}</td>
                <td className={style.actions}>
                  <button 
                    className={style.editButton}
                    onClick={() => router.push(`/Admin/usuarios/editar/${usuario.id}`)}
                  >
                    Editar
                  </button>
                  {usuario.id !== user?.id && (
                    <button 
                      className={`${style.deleteButton} ${deleteLoading === usuario.id ? style.loading : ''}`}
                      onClick={() => handleDelete(usuario.id)}
                      disabled={deleteLoading === usuario.id}
                    >
                      {deleteLoading === usuario.id ? 'Excluindo...' : 'Excluir'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.infoMessage}>
        <p>
          <strong>Atenção:</strong> Esta é uma área restrita. 
          Apenas administradores podem gerenciar usuários do sistema.
          Você não pode excluir sua própria conta.
        </p>
      </div>
    </div>
  );
} 