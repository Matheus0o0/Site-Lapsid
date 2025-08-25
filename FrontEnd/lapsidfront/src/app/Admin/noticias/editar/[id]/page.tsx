"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import style from '../../../../Style/AdminPages.module.css';
import { useAuth } from '@/app/context/Auth';
import { getNoticia, updateNoticia, Noticia } from '@/services/noticiaService';

export default function EditarNoticia() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        setFetchLoading(true);
        const data = await getNoticia(Number(params.id));
        setNoticia(data);
        setTitulo(data.titulo);
        setConteudo(data.conteudo);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar notícia:', err);
        setError(err.message || 'Erro ao carregar notícia');
      } finally {
        setFetchLoading(false);
      }
    };

    if (params.id) {
      fetchNoticia();
    }
  }, [params.id]);

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

      const noticiaAtualizada = {
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        data_atualizacao: new Date().toISOString()
      };

      await updateNoticia(Number(params.id), noticiaAtualizada, imagem || undefined);

      router.push('/Admin/noticias');
    } catch (err: any) {
      console.error('Erro ao atualizar notícia:', err);
      setError(err.message || 'Erro ao atualizar notícia');
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
        <div className={style.loading}>Carregando notícia...</div>
      </div>
    );
  }

  if (error && !noticia) {
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
        <h1>Editar Notícia</h1>
        <p>Modifique os dados da notícia</p>
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
          {(imagemPreview || noticia?.imagem) && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <img 
                src={imagemPreview || noticia?.imagem} 
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
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
} 