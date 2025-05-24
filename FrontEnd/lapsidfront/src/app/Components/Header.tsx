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
          <Link href="../Noticias" className={style.link}>
            Notícias
          </Link>
          <Link href="../Projetos" className={style.link}>
            Projetos
          </Link>
          <Link href="../Publicacoes" className={style.link}>
            Publicações
          </Link>
          <Link href="../Equipe" className={style.link}>
            Equipe
          </Link>
          <Link href="../Parcerias" className={style.link}>
            Parcerias
          </Link>
          <Link href="../Contatos" className={style.link}>
            Contatos
          </Link>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link href="../testeAdmin" className={style.link}>
                  Admin
                </Link>
              )}
              <button onClick={logout} className={style.link}>
                Sair
              </button>
            </>
          ) : (
            <Link href="/Login" className={style.link}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
