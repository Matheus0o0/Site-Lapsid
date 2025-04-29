import style from '../Style/Projetos.module.css';
import Image from 'next/image';

export default function Projetos() {
    return (
        <main className={style.main}>
            <h1 className={style.title}>Projetos</h1>
            <section>
                <div className={style.prj}>
                    <h2 className={style.h2Prj}>Inovação Sustentável: Energia Renovável para Todos</h2>
                    <div className={style.divPrj}>
                        <Image className={style.imgPrj} src={"CardImgs/Frame(2).svg"} alt="Projeto 1" width={100} height={100}/>
                        <div className={style.contentDivPrj}>
                            <p className={style.pPrj}>Este projeto busca democratizar o acesso à energia renovável, desenvolvendo soluções acessíveis e sustentáveis para comunidades carentes. A iniciativa combina tecnologia de ponta com práticas ecológicas para criar um impacto positivo no meio ambiente e na sociedade.</p>
                            <p> <b>Nome do autor</b>: Pedro Sena</p>
                        </div>
                    </div>
                </div>
                <div className={style.divHr}>
                    <hr className={style.hr}/>
                </div>
                <div className={style.prj}>
                    <h2 className={style.h2Prj}>Educação Digital: Transformando o Ensino com Tecnologia</h2>
                    <div className={style.divPrj}>
                        <Image className={style.imgPrj} src={"CardImgs/Frame3.svg"} alt="Projeto 1" width={100} height={100}/>
                        <div className={style.contentDivPrj}>
                            <p className={style.pPrj}>Focado em modernizar o ensino, este projeto desenvolve plataformas digitais interativas que facilitam o aprendizado remoto e presencial. Com recursos como inteligência artificial e gamificação, o objetivo é tornar a educação mais inclusiva e eficiente.</p>
                            <p> <b>Nome do autor</b>: Matheus Amorim</p>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}