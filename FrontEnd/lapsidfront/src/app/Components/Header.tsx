"use client";

import { useAuth } from '../context/Auth';
import Link from 'next/link';
import style from '../Style/Header.module.css';
import { useState } from 'react';

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
              {/* Dropdown do Dashboard */}
              <div 
                className={style.dropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className={style.dropdownHeader}>
                  <Link href="/Admin" className={style.link}>
                    Dashboard
                  </Link>
                  <span className={style.dropdownToggle}>▼</span>
                </div>
                <div 
                  className={`${style.dropdownContent} ${isDropdownOpen ? style.show : ''}`}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link href="/Admin/noticias" className={style.dropdownLink}>
                    Gerenciar Notícias
                  </Link>
                  <Link href="/Admin/Projetos" className={style.dropdownLink}>
                    Gerenciar Projetos
                  </Link>
                  <Link href="/Admin/Publicacoes" className={style.dropdownLink}>
                    Gerenciar Publicações
                  </Link>
                  <Link href="/Admin/Parcerias" className={style.dropdownLink}>
                    Gerenciar Parcerias
                  </Link>
                  {isAdmin && (
                    <Link href="/Admin/usuarios" className={style.dropdownLink}>
                      Gerenciar Usuários
                    </Link>
                  )}
                </div>
              </div>

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
