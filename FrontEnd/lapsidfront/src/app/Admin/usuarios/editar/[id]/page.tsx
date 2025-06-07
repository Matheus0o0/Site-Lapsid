'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../../context/Auth';
import { userService, User } from '../../../../../services/users/users';
import style from '../../../../../Style/AdminPages.module.css';

export default function EditarUsuario({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: 'user'
  });

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchUser = async () => {
      try {
        const userId = parseInt(params.id);
        const userData = await userService.getUser(userId);
        setFormData({
          ...userData,
          role: userData.is_staff ? 'admin' : 'user'
        });
        setError(null);
      } catch (err: any) {
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
      const userId = parseInt(params.id);
      await userService.updateUser(userId, {
        ...formData,
        nome: `${formData.first_name} ${formData.last_name}`,
        is_staff: formData.role === 'admin',
        is_superuser: formData.role === 'admin'
      });
      router.push('/Admin/usuarios');
    } catch (err: any) {
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
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
          <label htmlFor="first_name">Nome:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className={style.input}
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="last_name">Sobrenome:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
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
            className={style.select}
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className={style.formActions}>
          <button
            type="button"
            onClick={() => router.push('/Admin/usuarios')}
            className={style.cancelButton}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className={style.submitButton}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
} 