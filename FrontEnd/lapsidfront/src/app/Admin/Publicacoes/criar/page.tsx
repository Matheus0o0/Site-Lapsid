'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/Auth';
import { createPublicacao } from '@/services/publicacaoService';
import style from '../../../Style/AdminPages.module.css';

export default function CriarPublicacao() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    autor: '',
    ano: '',
    link: ''
  });

  if (!isAdmin || !user) {
    router.push('/dashboard');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createPublicacao(formData);
      router.push('/Admin/Publicacoes');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar publicação');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Criar Publicação</h1>
        <p>Preencha os dados para adicionar uma nova publicação</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className={style.input}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="conteudo">Conteúdo:</label>
          <textarea
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            required
            className={style.textarea}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
            className={style.input}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="ano">Ano:</label>
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleChange}
            required
            className={style.input}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className={style.input}
          />
        </div>
        <div className={style.formActions}>
          <button
            type="submit"
            className={style.submitButton}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Criar Publicação'}
          </button>
          <button
            type="button"
            className={style.cancelButton}
            onClick={() => router.push('/Admin/Publicacoes')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}