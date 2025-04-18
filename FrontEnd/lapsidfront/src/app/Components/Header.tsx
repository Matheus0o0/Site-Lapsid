"use client";

import React, { useState } from 'react';
import style from "../Style/Header.module.css"

export default function Header() {
  const [menuAberto, setMenuAberto] = useState<boolean>(false);

  return (
    <header className={style.allHeader}>
      <button
        className={style.hamburger}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        ☰
      </button>

      <ul className={`${style.ulHeader} ${menuAberto ? style.menuAberto : ''}`}>
        <li className={style.liHeader}><a className={style.aHeader} href="/">Início</a></li>
        <li className={style.liHeader}><a className={style.aHeader} href="../Equipe">Equipe</a></li>
        <li className={style.liHeader}><a className={style.aHeader} href="../Projetos">Projetos</a></li>
        <li className={style.liHeader}><a className={style.aHeader} href="../Publicacoes">Publicações</a></li>
        <li className={style.liHeader}><a className={style.aHeader} href="../Noticias">Notícias</a></li>
        <li className={style.liHeader}><a className={style.aHeader} href="../Parcerias">Parcerias</a></li>
        <li className={style.liHeader}><a className={style.aHeader} href="../Contatos">Contatos</a></li>
      </ul>
    </header>
  );
}
