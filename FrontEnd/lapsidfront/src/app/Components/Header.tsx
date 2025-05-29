"use client";

import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import style from '../Style/Header.module.css';

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link href="/" className={style.logo}>
          LAPSID
        </Link>
        <div className={style.links}>
          {/* Links públicos */}
          <Link href="/Noticias" className={style.link}>
            Notícias
          </Link>
          <Link href="/Projetos" className={style.link}>
            Projetos
          </Link>
          <Link href="/Publicacoes" className={style.link}>
            Publicações
          </Link>
          <Link href="/Equipe" className={style.link}>
            Equipe
          </Link>
          <Link href="/Parcerias" className={style.link}>
            Parcerias
          </Link>
          <Link href="/Contatos" className={style.link}>
            Contatos
          </Link>

          {/* Links para usuários autenticados */}
          {isAuthenticated && (
            <>
              {/* Links de gerenciamento de conteúdo - disponível para todos os usuários autenticados */}
              <Link href="/Admin/noticias" className={style.link}>
                Gerenciar Notícias
              </Link>
              <Link href="/Admin/projetos" className={style.link}>
                Gerenciar Projetos
              </Link>
              <Link href="/Admin/publicacoes" className={style.link}>
                Gerenciar Publicações
              </Link>
              <Link href="/Admin/parcerias" className={style.link}>
                Gerenciar Parcerias
              </Link>

              {/* Link de gerenciamento de usuários - apenas para admins */}
              {isAdmin && (
                <Link href="/Admin/usuarios" className={style.link}>
                  Gerenciar Usuários
                </Link>
              )}

              <button onClick={logout} className={style.link}>
                Sair
              </button>
            </>
          )}

          {/* Link de login para usuários não autenticados */}
          {!isAuthenticated && (
            <Link href="/Login" className={style.link}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
