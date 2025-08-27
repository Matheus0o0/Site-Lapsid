"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import style from '../../../Style/AdminPages.module.css';
import { useAuth } from '@/app/context/Auth';
import { createNoticia } from '@/services/noticiaService';

export default function CriarNoticia() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      setError('O título é obrigatório');
      return;
    }

    if (!conteudo.trim()) {
      setError('O conteúdo é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const novaNoticia = { 
        titulo: titulo.trim(), 
        conteudo: conteudo.trim(), 
        data_noticia: new Date().toISOString(),
        autor: user?.id || 0
      };

      await createNoticia(novaNoticia, imagem || undefined);

      router.push('/Admin/noticias');
    } catch (err: any) {
      console.error('Erro ao criar notícia:', err);
      setError(err.message || 'Erro ao criar notícia');
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
        <h1>Criar Nova Notícia</h1>
        <p>Preencha os dados da notícia</p>
      </div>

      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="titulo">Título *</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
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
          <label htmlFor="conteudo">Conteúdo *</label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            value={conteudo}
            onEditorChange={(content) => setConteudo(content)}
            init={{
              height: 400,
              menubar: true,
              language: 'pt_BR',
              language_url: '/tinymce/langs/pt_BR.js',
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | styles | ' +
                'bold italic underline strikethrough | forecolor backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              branding: false,
              promotion: false,
              statusbar: false,
              resize: false
            }}
          />
        </div>

        <div className={style.formActions}>
          <button
            type="button"
            className={style.cancelButton}
            onClick={() => router.push('/Admin/noticias')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`${style.submitButton} ${loading ? style.buttonLoading : ''}`}
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Notícia'}
          </button>
        </div>
      </form>
    </div>
  );
} 