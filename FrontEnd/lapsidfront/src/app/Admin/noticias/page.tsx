'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import style from '../../Style/AdminPages.module.css';

export default function GerenciarNoticias() {
  const { user } = useAuth();
  const [noticias, setNoticias] = useState([
    { id: 1, titulo: 'Notícia 1', autor: 'João' },
    { id: 2, titulo: 'Notícia 2', autor: 'Maria' }
  ]);

  return (
    <div className={style.pageContainer}>
      <div className={style.header}>
        <h1>Gerenciar Notícias</h1>
        <p>Bem-vindo, {user?.nome}</p>
      </div>

      <button className={style.createButton}>
        Criar Nova Notícia
      </button>

      <div className={style.content}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.titulo}</td>
                <td>{noticia.autor}</td>
                <td className={style.actions}>
                  <button className={style.editButton}>
                    Editar
                  </button>
                  <button className={style.deleteButton}>
                    Excluir
                  </button>
                  <button className={style.viewButton}>
                    Visualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 