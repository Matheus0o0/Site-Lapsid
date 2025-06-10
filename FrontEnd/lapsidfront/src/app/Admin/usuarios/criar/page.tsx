'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/Auth';
import { userService } from '../../../../services/users/users';
import style from '../../../Style/AdminPages.module.css';

export default function CriarUsuario() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    role: 'user' as const
  });

  if (!isAdmin || !user) {
    router.push('/dashboard');
    return null;
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validação do email
    if (!validateEmail(formData.email)) {
      setError('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    // Validação da senha
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role
      };

      await userService.createUser(userData);
      router.push('/Admin/usuarios');
    } catch (err: any) {
      console.error('Erro ao criar usuário:', err);
      if (err.message.includes('email')) {
        setError('Este email já está em uso');
      } else {
        setError(err.message || 'Erro ao criar usuário');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Criar Novo Usuário</h1>
        <p>Preencha os dados do novo usuário</p>
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
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
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
            className={`${style.submitButton} ${loading ? style.buttonLoading : ''}`}
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
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