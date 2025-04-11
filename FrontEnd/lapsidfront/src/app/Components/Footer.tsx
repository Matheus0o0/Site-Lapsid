import style from "../Style/Footer.module.css";
import Image from "next/image";

export default function Footer() {
    return(
        <footer style={{ marginTop: '15em', height: '3em', margin: '0 auto'}} className={style.footer}>
            <Image className={style.logoIf} src="logos/Rectangle6.svg" alt="IFBA Logo" width={500} height={500}/>
            <p className={style.textFooter}><b>Todos os direitos reservados</b></p>
            <ul className={style.listFooter}>
                <li className={style.phone}>(55) 9999-999</li>
                <li className={style.insta}>@Lapsid</li>
                <li className={style.email}>Lapsid@gmail.com.br</li>
            </ul> 
        </footer>
    );
}