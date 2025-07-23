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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fechar menu quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest(`.${styles.links}`) && !(event.target as Element).closest(`.${styles.hamburger}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Previne scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, styles.links, styles.hamburger]);

  // Fechar menu mobile quando redimensionar para desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
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

        {isMobile && (
          <button 
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        <div className={`${styles.links} ${isMobile ? styles.mobileLinks : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link href="/" className={styles.link} onClick={closeMobileMenu}>
            Início
          </Link>
          <Link href="/Noticias" className={styles.link} onClick={closeMobileMenu}>
            Notícias
          </Link>
          <Link href="/Projetos" className={styles.link} onClick={closeMobileMenu}>
            Projetos
          </Link>
          <Link href="/Publicacoes" className={styles.link} onClick={closeMobileMenu}>
            Publicações
          </Link>
          <Link href="/Parcerias" className={styles.link} onClick={closeMobileMenu}>
            Parcerias
          </Link>
          <Link href="/Equipe" className={styles.link} onClick={closeMobileMenu}>
            Equipe
          </Link>
          <Link href="/Contatos" className={styles.link} onClick={closeMobileMenu}>
            Contato
          </Link>

          {user ? (
            isMobile ? (
              <div className={styles.mobileUserSection}>
                <span className={styles.mobileUserName}>{user.nome}</span>
                {isAdmin && (
                  <Link href="/Admin" className={styles.mobileLink} onClick={closeMobileMenu}>
                    Painel Admin
                  </Link>
                )}
                <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
                  Sair
                </button>
              </div>
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
            null
          )}
        </div>
      </nav>
    </header>
  );
}
