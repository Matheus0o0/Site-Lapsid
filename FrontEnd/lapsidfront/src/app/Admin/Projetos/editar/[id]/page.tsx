"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import style from '../../../../Style/AdminPages.module.css';
import { useAuth } from '@/app/context/Auth';
import { getProjetos, updateProjeto, Projeto } from '@/services/projetoService';

export default function EditarProjeto() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        setFetchLoading(true);
        const projetos = await getProjetos();
        const data = projetos.find((p: Projeto) => p.id === Number(params.id));
        if (!data) {
          throw new Error('Projeto não encontrado');
        }
        setProjeto(data);
        setTitulo(data.titulo);
        setConteudo(data.conteudo);
        setAutor(data.autor || '');
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar projeto:', err);
        setError(err.message || 'Erro ao carregar projeto');
      } finally {
        setFetchLoading(false);
      }
    };

    if (params.id) {
      fetchProjeto();
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

      if (imagem) {
        const formData = new FormData();
        formData.append('titulo', titulo.trim());
        formData.append('conteudo', conteudo.trim());
        formData.append('autor', autor.trim());
        formData.append('data_atualizacao', new Date().toISOString());
        formData.append('imagem', imagem);
        await updateProjeto(Number(params.id), formData);
      } else {
        const projetoAtualizado = {
          titulo: titulo.trim(),
          conteudo: conteudo.trim(),
          autor: autor.trim(),
          data_atualizacao: new Date().toISOString()
        };
        await updateProjeto(Number(params.id), projetoAtualizado);
      }

      router.push('/Admin/Projetos');
    } catch (err: any) {
      console.error('Erro ao atualizar projeto:', err);
      setError(err.message || 'Erro ao atualizar projeto');
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
        <div className={style.loading}>Carregando projeto...</div>
      </div>
    );
  }

  if (error && !projeto) {
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
        <h1>Editar Projeto</h1>
        <p>Modifique os dados do projeto</p>
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
          <label htmlFor="autor">Autor</label>
          <input
            id="autor"
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className={style.input}
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
          {(imagemPreview || projeto?.imagem) && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <img 
                src={imagemPreview || projeto?.imagem} 
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
            onClick={() => router.push('/Admin/Projetos')}
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