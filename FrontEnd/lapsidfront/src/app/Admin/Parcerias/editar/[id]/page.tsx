"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import style from '../../../../Style/AdminPages.module.css';
import { useAuth } from '@/app/context/Auth';
import { getParcerias, updateParceria, Parceria } from '@/services/parceriaService';

export default function EditarParceria() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [parceria, setParceria] = useState<Parceria | null>(null);
  const [nomeParceria, setNomeParceria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParceria = async () => {
      try {
        setFetchLoading(true);
        const parcerias = await getParcerias();
        const data = parcerias.find((p: Parceria) => p.id === Number(params.id));
        if (!data) {
          throw new Error('Parceria não encontrada');
        }
        setParceria(data);
        setNomeParceria(data.nome_parceria);
        setDescricao(data.descricao);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar parceria:', err);
        setError(err.message || 'Erro ao carregar parceria');
      } finally {
        setFetchLoading(false);
      }
    };

    if (params.id) {
      fetchParceria();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nomeParceria.trim()) {
      setError('O nome da parceria é obrigatório');
      return;
    }

    if (!descricao.trim()) {
      setError('A descrição é obrigatória');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('nome_parceria', nomeParceria.trim());
      formData.append('descricao', descricao.trim());
      formData.append('data_atualizacao', new Date().toISOString());
      
      if (imagem) {
        formData.append('imagem', imagem);
      }

      await updateParceria(Number(params.id), formData);

      router.push('/Admin/Parcerias');
    } catch (err: any) {
      console.error('Erro ao atualizar parceria:', err);
      setError(err.message || 'Erro ao atualizar parceria');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin || !user) {
    router.push('/dashboard');
    return null;
  }

  if (fetchLoading) {
    return (
      <div className={style.pageContainer}>
        <div className={style.loading}>Carregando parceria...</div>
      </div>
    );
  }

  if (error && !parceria) {
    return (
      <div className={style.pageContainer}>
        <div className={style.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Editar Parceria</h1>
        <p>Modifique os dados da parceria</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="nomeParceria">Nome da Parceria *</label>
          <input
            id="nomeParceria"
            type="text"
            value={nomeParceria}
            onChange={(e) => setNomeParceria(e.target.value)}
            className={style.input}
            required
            disabled={loading}
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="imagem">Imagem (opcional)</label>
          <input
            id="imagem"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImagem(file);
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => setImagemPreview(e.target?.result as string);
                reader.readAsDataURL(file);
              } else {
                setImagemPreview(null);
              }
            }}
            className={style.input}
            disabled={loading}
          />
          {(imagemPreview || parceria?.imagem_url) && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <img 
                src={imagemPreview || parceria?.imagem_url} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  height: 'auto', 
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </div>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="descricao">Descrição *</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={style.input}
            rows={8}
            required
            disabled={loading}
            placeholder="Descreva a parceria..."
          />
        </div>

        <div className={style.formActions}>
          <button
            type="button"
            className={style.cancelButton}
            onClick={() => router.push('/Admin/Parcerias')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`${style.submitButton} ${loading ? style.buttonLoading : ''}`}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
} 