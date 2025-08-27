'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/app/context/Auth';
import { getPublicacoes, updatePublicacao } from '@/services/publicacaoService';
import style from '../../../../Style/AdminPages.module.css';

export default function EditarPublicacao() {
  const router = useRouter();
  const params = useParams();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    autor: '',
    ano: '',
    link: ''
  });

  useEffect(() => {
    if (!isAdmin || !user) {
      router.push('/dashboard');
      return;
    }

    const fetchPublicacao = async () => {
      try {
        const id = parseInt(params.id as string);
        if (isNaN(id)) throw new Error('ID inválido');
        const publicacoes = await getPublicacoes();
        const publicacao = publicacoes.find(p => p.id === id);
        if (!publicacao) throw new Error('Publicação não encontrada');
        setFormData({
          titulo: publicacao.titulo,
          conteudo: publicacao.conteudo,
          autor: publicacao.autor,
          ano: publicacao.ano,
          link: publicacao.link
        });
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar publicação');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacao();
  }, [params.id, isAdmin, user, router]);

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
      const id = parseInt(params.id as string);
      if (isNaN(id)) throw new Error('ID inválido');
      await updatePublicacao(id, formData);
      router.push('/Admin/Publicacoes');
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar publicação');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={style.pageContainer}>
        <div className={style.loading}>Carregando publicação...</div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Editar Publicação</h1>
        <p>Atualize os dados da publicação</p>
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
            {saving ? 'Salvando...' : 'Salvar Alterações'}
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