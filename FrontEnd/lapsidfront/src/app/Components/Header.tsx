import style from "../Style/Header.module.css"

export default function Header() {
  return (
    <header className={style.allHeader}>
        <ul className={style.ulHeader}>
            <li className={style.liHeader}>Início</li>
            <li className={style.liHeader}>Equipe</li>
            <li className={style.liHeader}>Projetos</li>
            <li className={style.liHeader}>Publicações</li>
            <li className={style.liHeader}>Notícias</li>
            <li className={style.liHeader}>Parcerias</li>
            <li className={style.liHeader}>Contatos</li>
        </ul>
    </header>
  );
}