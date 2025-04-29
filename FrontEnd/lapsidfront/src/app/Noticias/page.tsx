import style from '../Style/Noticias.module.css';
import Image from 'next/image';
export default function Noticias() {
    return (
        <main className={style.main}>
            <h1 className={style.ttlH1}>Notícias</h1>
            <section>
                <div className={style.ultNewContent}>
                    <h2 className={style.ultNewTitle} >Ultimas notícias</h2>
                    <div className={style.ultNewCard}>
                        <div className={style.ultNewImgContent}>
                            <Image className={style.ultNewImg} src={"CardImgs/Frame(5).svg"} alt="Noticias" width={600} height={300}/>
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
                    <hr className={style.Hr}/>
                </div>
            <section>
                <div>
                    <h2 className={style.ultLastTitle} >Notícias da Semana</h2>
                    <div className={style.allNewsCard}>
                        <div className={style.allNewsCardContent}>
                            <Image className={style.allNewsImg} src={"CardImgs/Frame(5).svg"} alt="Noticias" width={300} height={300}/>
                            <div className={style.allNewsResume}>
                                <h3 className={style.allNewsH3}>Pesquisadores anunciaram uma nova tecnologia que promete tornar a energia renovável mais acessível e eficiente. O projeto está em fase de testes e pode ser um marco na luta contra as mudanças climáticas.</h3>
                                <p><b>Data da potagem:</b> 12/04/2025</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={style.allNewsCard}>
                        <div className={style.allNewsCardContent}>
                            <Image className={style.allNewsImg} src={"CardImgs/Frame(5).svg"} alt="Noticias" width={300} height={300}/>
                            <div className={style.allNewsResume}>
                                <h3 className={style.allNewsH3}>Um evento de tecnologia realizado no último final de semana reuniu jovens inovadores de todo o país. O encontro contou com palestras, workshops e competições, destacando projetos promissores na área de tecnologia e sustentabilidade.</h3>
                                <p><b>Data da potagem:</b> 12/04/2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}