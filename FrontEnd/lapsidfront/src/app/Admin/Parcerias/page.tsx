"use client";
import { useEffect, useState } from 'react';
import styles from './Parcerias.module.css';
import { useAuth } from '@/app/context/Auth';
import { getParcerias, createParceria, deleteParceria, Parceria } from '@/services/parceriaService';
import axios from 'axios';
import Image from 'next/image';

export default function Parcerias() {
  const { user } = useAuth();
  const [parcerias, setParcerias] = useState<Parceria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [novaImagem, setNovaImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [criarError, setCriarError] = useState<string | null>(null);

  useEffect(() => {
    // Obter CSRF token ao montar o componente
    const getCsrfToken = async () => {
      try {
        await axios.get('http://localhost:8001/api/csrf', { withCredentials: true });
      } catch (error) {
        console.error('Erro ao obter CSRF token:', error);
      }
    };

    getCsrfToken();
    fetchParcerias();
  }, []);

  async function fetchParcerias() {
    try {
      setIsLoading(true);
      const data = await getParcerias();
      setParcerias(data);
      setError(null);
    } catch (error) {
      setError('Erro ao carregar parcerias');
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
      const formData = new FormData();
      
      formData.append('nome_parceria', novoTitulo.trim());
      formData.append('descricao', novoConteudo.trim());
      formData.append('data_criacao', new Date().toISOString());
      formData.append('data_atualizacao', new Date().toISOString());
      
      if (novaImagem) {
        formData.append('imagem', novaImagem);
      }

      await createParceria(formData);

      setNovoTitulo('');
      setNovoConteudo('');
      setNovaImagem(null);
      setImagemPreview(null);
      fetchParcerias();
    } catch (error) {
      console.error('Erro detalhado ao criar parceria:', error);
      setCriarError(error instanceof Error ? error.message : 'Erro ao criar parceria');
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setCriarError('A imagem deve ter no máximo 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setCriarError('O arquivo deve ser uma imagem');
        return;
      }

      setNovaImagem(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão da parceria?')) return;
    try {
      await deleteParceria(id);
      fetchParcerias();
    } catch (error) {
      console.error('Erro ao deletar parceria:', error);
      alert(error instanceof Error ? error.message : 'Erro ao deletar parceria');
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

  if (isLoading) return <div>Carregando parcerias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Parcerias</h1>

      <div className={styles.formContainer}>
        <h2>Nova Parceria</h2>
        {criarError && (
          <div className={styles.error}>{criarError}</div>
        )}
        <input 
          className={styles.input}
          placeholder="Título" 
          value={novoTitulo} 
          onChange={e => setNovoTitulo(e.target.value)} 
        />
        <div className={styles.imageUpload}>
          <label htmlFor="imagem" className={styles.uploadLabel}>
            {imagemPreview ? 'Alterar Imagem' : 'Selecionar Imagem'}
          </label>
          <input
            type="file"
            id="imagem"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          {imagemPreview && (
            <div className={styles.previewContainer}>
              <Image
                src={imagemPreview}
                alt="Preview"
                width={200}
                height={200}
                className={styles.previewImage}
              />
              <button
                className={styles.removeImage}
                onClick={() => {
                  setNovaImagem(null);
                  setImagemPreview(null);
                }}
              >
                Remover
              </button>
            </div>
          )}
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Conteúdo"
          value={novoConteudo}
          onChange={e => setNovoConteudo(e.target.value)}
          rows={10}
        />
        <button className={styles.button} onClick={handleCreate}>Criar</button>
      </div>

      <div className={styles.listContainer}>
        {parcerias.map(parceria => (
          <div key={parceria.id} className={styles.card}>
            {parceria.imagem && (
              <div className={styles.cardImage}>
                <Image
                  src={parceria.imagem}
                  alt={parceria.nome_parceria}
                  width={300}
                  height={200}
                  className={styles.parceriaImage}
                />
              </div>
            )}
            <h3>{parceria.nome_parceria}</h3>
            <div className={styles.content}>{parceria.descricao}</div>
            <div className={styles.dates}>
              <p>
                <strong>Data de Criação:</strong> {formatarData(parceria.data_criacao)}
              </p>
              <p>
                <strong>Data de Atualização:</strong> {formatarData(parceria.data_atualizacao)}
              </p>
            </div>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(parceria.id)}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}