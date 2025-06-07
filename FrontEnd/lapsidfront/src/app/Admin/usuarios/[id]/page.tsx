'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/Auth';
import { userService, User } from '../../../../services/users/users';
import style from '../../../../Style/AdminPages.module.css';

export default function DetalhesUsuario({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchUser = async () => {
      try {
        const userId = parseInt(params.id);
        const data = await userService.getUser(userId);
        setUserData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id, isAdmin, user, router]);

  if (loading) {
    return (
      <div className={style.pageContainer}>
        <div className={style.loading}>Carregando usuário...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className={style.pageContainer}>
        <div className={style.error}>
          <p>{error || 'Usuário não encontrado'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Detalhes do Usuário</h1>
        <p>Informações completas do usuário</p>
      </div>

      <div className={style.content}>
        <div className={style.card}>
          <h2>Informações Pessoais</h2>
          <div className={style.infoGroup}>
            <label>Nome Completo:</label>
            <p>{userData.nome}</p>
          </div>
          <div className={style.infoGroup}>
            <label>Nome de Usuário:</label>
            <p>{userData.username}</p>
          </div>
          <div className={style.infoGroup}>
            <label>Email:</label>
            <p>{userData.email}</p>
          </div>
        </div>

        <div className={style.card}>
          <h2>Informações da Conta</h2>
          <div className={style.infoGroup}>
            <label>Tipo de Usuário:</label>
            <p>{userData.is_staff ? 'Administrador' : 'Usuário'}</p>
          </div>
          <div className={style.infoGroup}>
            <label>Status:</label>
            <p>{userData.is_active ? 'Ativo' : 'Inativo'}</p>
          </div>
          <div className={style.infoGroup}>
            <label>Data de Criação:</label>
            <p>{new Date(userData.date_joined).toLocaleDateString()}</p>
          </div>
          <div className={style.infoGroup}>
            <label>Último Login:</label>
            <p>{new Date(userData.last_login).toLocaleDateString()}</p>
          </div>
        </div>

        <div className={style.actions}>
          <button
            onClick={() => router.push(`/Admin/usuarios/editar/${userData.id}`)}
            className={style.editButton}
          >
            Editar Usuário
          </button>
          <button
            onClick={() => router.push('/Admin/usuarios')}
            className={style.backButton}
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    </div>
  );
} 