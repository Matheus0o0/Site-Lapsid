import style from '../Style/Noticias.module.css';
import Image from 'next/image';
import { getNoticias } from '@/services/noticiaService';

type Noticia = {
    id: number;
    titulo: string;
    imagem: string,
    conteudo: string,
    autor_id: number,
    data_criacao: string,
    data_atualizacao: string,
    data_noticia: string
}
export default function Noticias() {
    const noticia: Noticia[] = getNoticias();


    return (
        <main className={style.main}>
            <h1 className={style.ttlH1}>Notícias</h1>
            <section>
                <div className={style.ultNewContent}>
                    <h2 className={style.ultNewTitle} >Ultimas notícias</h2>
                    <div className={style.ultNewCard}>
                        <div className={style.ultNewImgContent}>
                            <Image className={style.ultNewImg} src={"CardImgs/Frame(5).svg"} alt="Noticias" width={600} height={300} />
                        </div>
                        <div className={style.ultNewsPrev}>
                            <h2 className={style.ultNewH2}>Lançamento de Nova Plataforma de Educação Digital</h2>
                            <p className={style.ultNewText}>Uma nova plataforma de educação digital foi lançada esta semana, prometendo revolucionar o ensino com recursos de inteligência artificial e gamificação. A ferramenta já está sendo utilizada em escolas piloto e tem recebido feedback positivo de professores e alunos.</p>
                            <div className={style.ultNewAuthor}>
                                {/* <Image className={style.icon} src={"CardImgs/Frame(2).svg"} alt="Noticias" width={150} height={150}/> */}
                                <p> <b>Por</b>: Jhon Doe</p>
                            </div>
                            <div>
                                <p>Data de postagem: 12/02/2025</p>
                            </div>
                            <button className={style.ultNewBtn}>Leia mais</button>
                        </div>
                    </div>
                </div>
            </section>
            <div className={style.divHr}>
                <hr className={style.Hr} />
            </div>
            <section>
                <div>
                    <h2 className={style.ultLastTitle} >Notícias da Semana</h2>
                    {noticia.map((noticia) => (
                        <div className={style.allNewsCard}>
                            <div key={noticia.id} className={style.allNewsCardContent}>
                                <Image className={style.allNewsImg} src={"CardImgs/Frame(5).svg"} alt="Noticias" width={300} height={300} />
                                <div className={style.allNewsResume}>
                                    <h3 className={style.allNewsH3}>{noticia.conteudo}</h3>
                                    <p><b>Data da potagem:</b> 12/04/2025</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}