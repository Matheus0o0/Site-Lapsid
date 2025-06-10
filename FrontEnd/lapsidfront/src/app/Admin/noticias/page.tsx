"use client";
import { useEffect, useState } from 'react';
import { getNoticias, createNoticia, updateNoticia, deleteNoticia } from '@/services/noticiaService';
import { Noticia } from '@/types/Noticia';
import styles from './Noticias.module.css';
import { useAuth } from '@/app/context/Auth';
import { Editor } from '@tinymce/tinymce-react';

export default function Noticias() {
  const { user } = useAuth();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [novaImagem, setNovaImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [criarError, setCriarError] = useState<string | null>(null);

  useEffect(() => {
    fetchNoticias();
  }, []);

  async function fetchNoticias() {
    try {
      setIsLoading(true);
      const data = await getNoticias();
      setNoticias(data);
      setError(null);
    } catch (error) {
      setError('Erro ao carregar notícias');
    } finally {
      setIsLoading(false);
    }
  }

  function handleImagemChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setNovaImagem(file);
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleCreate() {
    if (!user) {
      setCriarError('Usuário não autenticado');
      return;
    }

    if (!novoTitulo.trim()) {
      setCriarError('O título é obrigatório');
      return;
    }

    if (!novoConteudo.trim()) {
      setCriarError('O conteúdo é obrigatório');
      return;
    }

    try {
      setCriarError(null);
      const novaNoticia = { 
        titulo: novoTitulo.trim(), 
        conteudo: novoConteudo.trim(), 
        data_noticia: new Date().toISOString(),
        autor: user.id
      };
      await createNoticia(novaNoticia, novaImagem || undefined);
      setNovoTitulo('');
      setNovoConteudo('');
      setNovaImagem(null);
      setImagemPreview(null);
      fetchNoticias();
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
      setCriarError(error instanceof Error ? error.message : 'Erro ao criar notícia');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão da notícia?')) return;
    try {
      await deleteNoticia(id);
      fetchNoticias();
    } catch (error) {
      console.error('Erro ao deletar notícia:', error);
      alert(error instanceof Error ? error.message : 'Erro ao deletar notícia');
    }
  }

  if (isLoading) return <div>Carregando notícias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Notícias</h1>

      <div className={styles.formContainer}>
        <h2>Nova Notícia</h2>
        {criarError && (
          <div className={styles.error}>{criarError}</div>
        )}
        <input 
          className={styles.input}
          placeholder="Título" 
          value={novoTitulo} 
          onChange={e => setNovoTitulo(e.target.value)} 
        />
        <div className={styles.fileInputContainer}>
          <label htmlFor="imagem" className={styles.uploadLabel}>
            {imagemPreview ? 'Alterar Imagem' : 'Selecionar Imagem'}
          </label>
          <input 
            id="imagem"
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            className={styles.fileInput}
          />
          {imagemPreview && (
            <div className={styles.imagePreview}>
              <img src={imagemPreview} alt="Preview" />
            </div>
          )}
        </div>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          value={novoConteudo}
          onEditorChange={(content) => setNovoConteudo(content)}
          init={{
            height: 500,
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
            resize: false,
            menubar: 'file edit view insert format tools table help',
            menu: {
              file: { title: 'Arquivo', items: 'newdocument restoredraft | preview | print ' },
              edit: { title: 'Editar', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
              view: { title: 'Visualizar', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
              insert: { title: 'Inserir', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
              format: { title: 'Formato', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
              tools: { title: 'Ferramentas', items: 'spellchecker spellcheckerlanguage | code wordcount' },
              table: { title: 'Tabela', items: 'inserttable | cell row column | tableprops deletetable' },
              help: { title: 'Ajuda', items: 'help' }
            }
          }}
        />
        <button className={styles.button} onClick={handleCreate}>Criar</button>
      </div>

      <div className={styles.listContainer}>
        {noticias.map(noticia => (
          <div key={noticia.id} className={styles.card}>
            {noticia.imagem && (
              <img src={noticia.imagem} alt={noticia.titulo} className={styles.image} />
            )}
            <h3>{noticia.titulo}</h3>
            <div dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />
            <p className={styles.date}>
              {new Date(noticia.data_noticia || '').toLocaleDateString()}
            </p>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(noticia.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 