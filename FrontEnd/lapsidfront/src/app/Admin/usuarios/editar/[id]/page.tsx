'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/app/context/Auth';
import { userService, User } from '@/services/users/users';
import style from '@/app/Style/AdminPages.module.css';

export default function EditarUsuario() {
  const router = useRouter();
  const params = useParams();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    nome: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchUser = async () => {
      try {
        const userId = parseInt(params.id as string);
        if (isNaN(userId)) {
          throw new Error('ID de usuário inválido');
        }
        const userData = await userService.getUser(userId);
        setFormData(userData);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar usuário:', err);
        setError(err.message || 'Erro ao carregar usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id, isAdmin, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const userId = parseInt(params.id as string);
      if (isNaN(userId)) {
        throw new Error('ID de usuário inválido');
      }

      // Garantir que todos os campos obrigatórios estejam presentes
      const userDataToUpdate = {
        nome: formData.nome || '',
        email: formData.email || '',
        role: formData.role || 'user'
      };

      await userService.updateUser(userId, userDataToUpdate);
      router.push('/Admin/usuarios');
    } catch (err: any) {
      console.error('Erro ao atualizar usuário:', err);
      setError(err.message || 'Erro ao atualizar usuário');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className={style.pageContainer}>
        <div className={style.loading}>Carregando usuário...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Editar Usuário</h1>
        <p>Atualize os dados do usuário</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={style.input}
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={style.input}
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="role">Tipo de Usuário:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className={style.input}
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className={style.formActions}>
          <button
            type="submit"
            className={style.submitButton}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button
            type="button"
            className={style.cancelButton}
            onClick={() => router.push('/Admin/usuarios')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
} 