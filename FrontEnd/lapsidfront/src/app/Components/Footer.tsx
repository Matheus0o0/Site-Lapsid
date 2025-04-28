import style from "../Style/Footer.module.css";
import Image from "next/image";

export default function Footer() {
    



    return(
        <footer style={{ marginTop: '15em', height: '3em', margin: '0 auto'}} className={style.footer}>
            <Image className={style.logoIf} src="logos/Rectangle6.svg" alt="IFBA Logo" width={200} height={100}/>
            <p className={style.textFooter}><b>Todos os direitos reservados</b></p>
            <ul className={style.listFooter}>
                <li className={style.liIten}><a className={style.phone} href=""> <Image className={style.Icon}src="icons/whatsapp-128-svgrepo-com.svg" alt="IFBA Logo" width={15} height={15}/> (55) 9999-999</a></li>
                <li className={style.liIten}><a className={style.insta} href=""> <Image className={style.Icon} src="icons/instagram-svgrepo-com.svg" alt="IFBA Logo" width={15} height={15}/>@Lapsid</a></li>
                <li className={style.liIten}><a className={style.email} href=""> <Image className={style.Icon} src="icons/gmail-internet-media-svgrepo-com.svg" alt="IFBA Logo" width={15} height={15}/>lapsid&#64;ifba.edu.br</a></li>
            </ul> 
        </footer>
    );
}