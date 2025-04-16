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
                        <Image className={style.ultNewImg} src={"CardImgs/Frame(5).svg"} alt="Noticias" width={600} height={300}/>
                        <div className={style.ultNewsPrev}>
                            <h2 className={style.ultNewH2}>Título da notícia</h2>
                            <p className={style.ultNewText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat cupiditate, blanditiis aspernatur accusamus quod consequatur hic beatae odit non id commodi dolore, sed facere expedita est consequuntur libero reprehenderit. Nihil cupiditate odit accusantium veritatis neque provident earum dignissimos est reiciendis. Voluptatibus ducimus minima sapiente consequatur animi, veniam vero, eaque delectus sint repellat possimus iusto laboriosam excepturi. Assumenda, accusantium? Illo, molestias.</p>
                            <div className={style.ultNewAuthor}>
                                <Image className={style.icon} src={"CardImgs/Frame(2).svg"} alt="Noticias" width={150} height={150}/>
                                <p> <b>Nome do autor</b>: Sem Nome</p>
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
                                <h3 className={style.allNewsH3}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia aperiam, quasi ipsum, consequuntur fugiat omnis cum enim corrupti repellat saepe eligendi, adipisci pariatur earum quas. Debitis hic voluptates nobis cupiditate facilis soluta non ipsam. Possimus hic incidunt neque rem quasi?</h3>
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
                                <h3 className={style.allNewsH3}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia aperiam, quasi ipsum, consequuntur fugiat omnis cum enim corrupti repellat saepe eligendi, adipisci pariatur earum quas. Debitis hic voluptates nobis cupiditate facilis soluta non ipsam. Possimus hic incidunt neque rem quasi?</h3>
                                <p><b>Data da potagem:</b> 12/04/2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}