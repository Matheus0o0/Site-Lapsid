"use client";

import { useAuth } from '../hooks/useAuth';
import style from '../Style/Admin.module.css';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className={style.adminContainer}>
      <div className={style.header}>
        <h1>Painel Administrativo</h1>
        <p>Bem-vindo, {user?.nome}</p>
      </div>

      <div className={style.adminGrid}>
        <div className={style.adminCard}>
          <h2>Gerenciar Usuários</h2>
          <p>Adicionar, editar ou remover usuários do sistema</p>
          <Link href="/Admin/usuarios" className={style.adminLink}>
            Acessar
          </Link>
        </div>


        <div className={style.adminCard}>
          <h2>Gerenciar Notícias</h2>
          <p>Criar, editar ou remover notícias</p>
          <Link href="/Admin/noticias" className={style.adminLink}>
            Acessar
          </Link>
        </div>

        <div className={style.adminCard}>
          <h2>Gerenciar Projetos</h2>
          <p>Atualizar informações dos projetos</p>
          <Link href="/Admin/projetos" className={style.adminLink}>
            Acessar
          </Link>
        </div>

        <div className={style.adminCard}>
          <h2>Gerenciar Publicações</h2>
          <p>Adicionar ou atualizar publicações</p>
          <Link href="/Admin/publicacoes" className={style.adminLink}>
            Acessar
          </Link>
        </div>

        <div className={style.adminCard}>
          <h2>Gerenciar Equipe</h2>
          <p>Atualizar membros da equipe</p>
          <Link href="/Admin/equipe" className={style.adminLink}>
            Acessar
          </Link>
        </div>

        <div className={style.adminCard}>
          <h2>Gerenciar Parcerias</h2>
          <p>Atualizar informações de parcerias</p>
          <Link href="/Admin/parcerias" className={style.adminLink}>
            Acessar
          </Link>
        </div>
      </div>
    </div>
  );
} 