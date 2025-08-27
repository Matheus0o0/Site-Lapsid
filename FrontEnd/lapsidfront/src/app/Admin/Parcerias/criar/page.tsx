"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from '../../../Style/AdminPages.module.css';
import { useAuth } from '@/app/context/Auth';
import { createParceria } from '@/services/parceriaService';

export default function CriarParceria() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [nomeParceria, setNomeParceria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      formData.append('data_criacao', new Date().toISOString());
      formData.append('data_atualizacao', new Date().toISOString());
      
      if (imagem) {
        formData.append('imagem', imagem);
      }

      await createParceria(formData);

      router.push('/Admin/Parcerias');
    } catch (err: any) {
      console.error('Erro ao criar parceria:', err);
      setError(err.message || 'Erro ao criar parceria');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin || !user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Criar Nova Parceria</h1>
        <p>Preencha os dados da parceria</p>
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
          {imagemPreview && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <img 
                src={imagemPreview} 
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
            {loading ? 'Criando...' : 'Criar Parceria'}
          </button>
        </div>
      </form>
    </div>
  );
} 