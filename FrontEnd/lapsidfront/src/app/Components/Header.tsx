"use client";

import Link from 'next/link';
import { useAuth } from '../context/Auth';
import styles from '../Style/Header.module.css';
import { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Não fecha o dropdown em caso de erro
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          LAPSID
        </Link>

        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Início
          </Link>
          <Link href="/Noticias" className={styles.link}>
            Notícias
          </Link>
          <Link href="/Projetos" className={styles.link}>
            Projetos
          </Link>
          <Link href="/Publicacoes" className={styles.link}>
            Publicações
          </Link>
          <Link href="/Parcerias" className={styles.link}>
            Parcerias
          </Link>
          <Link href="/Equipe" className={styles.link}>
            Equipe
          </Link>
          <Link href="/Contatos" className={styles.link}>
            Contato
          </Link>

          {user ? (
            isMobile ? (
              <span className={styles.areaLogada}>Área Logada</span>
            ) : (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                  <span className={styles.dropdownToggle}>{user.nome}</span>
                  <span className={styles.dropdownToggle}>▼</span>
                </div>
                <div className={`${styles.dropdownContent} ${isDropdownOpen ? styles.show : ''}`}>
                  {isAdmin && (
                    <Link href="/Admin" className={styles.dropdownLink} onClick={() => {
                      setIsDropdownOpen(false);
                    }}>
                      Painel Admin
                    </Link>
                  )}
                  <button className={styles.dropdownLink} onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              </div>
            )
          ) : (
            <Link href="/Login" className={styles.link}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
