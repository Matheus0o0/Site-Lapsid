"use client";
import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from './Projetos.module.css';
import { useAuth } from '@/app/context/Auth';
import { getProjetos, createProjeto, deleteProjeto, Projeto } from '@/services/projetoService';

export default function Projetos() {
  const { user } = useAuth();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [criarError, setCriarError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjetos();
  }, []);

  async function fetchProjetos() {
    try {
      setIsLoading(true);
      const data = await getProjetos();
      setProjetos(data);
      setError(null);
    } catch (error) {
      setError('Erro ao carregar projetos');
    } finally {
      setIsLoading(false);
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
      const novoProjeto = {
        titulo: novoTitulo.trim(),
        conteudo: novoConteudo.trim(),
        data_criacao: new Date().toISOString(),
        data_atualizacao: new Date().toISOString()
      };
      await createProjeto(novoProjeto);
      setNovoTitulo('');
      setNovoConteudo('');
      fetchProjetos();
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      setCriarError(error instanceof Error ? error.message : 'Erro ao criar projeto');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão do projeto?')) return;
    try {
      await deleteProjeto(id);
      fetchProjetos();
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      alert(error instanceof Error ? error.message : 'Erro ao deletar projeto');
    }
  }

  function formatarData(data: string) {
    const date = new Date(data);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (isLoading) return <div>Carregando projetos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Projetos</h1>

      <div className={styles.formContainer}>
        <h2>Novo Projeto</h2>
        {criarError && (
          <div className={styles.error}>{criarError}</div>
        )}
        <input 
          className={styles.input}
          placeholder="Título" 
          value={novoTitulo} 
          onChange={e => setNovoTitulo(e.target.value)} 
        />
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
        {projetos.map(projeto => (
          <div key={projeto.id} className={styles.card}>
            <h3>{projeto.titulo}</h3>
            <div dangerouslySetInnerHTML={{ __html: projeto.conteudo }} />
            <div className={styles.dates}>
              <p>
                <strong>Data de Criação:</strong> {formatarData(projeto.data_criacao)}
              </p>
              <p>
                <strong>Data de Atualização:</strong> {formatarData(projeto.data_atualizacao)}
              </p>
            </div>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(projeto.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
