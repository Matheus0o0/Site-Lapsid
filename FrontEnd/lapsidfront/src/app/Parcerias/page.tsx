import style from '../Style/Parcerias.module.css';
import Image from 'next/image';

export default function Parcerias() {
    return (
        <main className={style.main}>
            <div className={style.container}>
                <h1 className={style.ttlH1}>Parcerias</h1>
                <div className={style.parcContent}>
                    <div className={style.img}>
                        <Image  src={"logos/logoufba.svg"} alt="Parcerias" width={200} height={200}/>
                    </div>

                    <div className={style.Parce}>
                        <h2 className={style.h2Parce}>Universidade Federal da Bahia (UFBA)</h2>
                        <p className={style.pParce}>A UFBA é uma das principais instituições de ensino superior do Brasil, reconhecida por sua excelência acadêmica e pesquisa de ponta. A parceria com a UFBA visa promover o desenvolvimento de projetos inovadores, fomentar a pesquisa científica e contribuir para a formação de profissionais qualificados em diversas áreas do conhecimento.</p>
                        <br />
                        <b>Link:</b> <a href="#">link</a>
                    </div>
                </div>

                <div className={style.divHr}>
                    <hr className={style.Hr}/>
                </div>

                <div className={style.parcContent}>
                    <div className={style.img}>
                        <Image  src={"logos/logoufba.svg"} alt="Parcerias" width={200} height={200}/>
                    </div>
                    <div className={style.Parce}>
                        <h2 className={style.h2Parce}>Instituto Federal da Bahia (IFBA)</h2>
                        <p className={style.pParce}>O IFBA é uma instituição de ensino técnico e tecnológico que desempenha um papel fundamental na formação de profissionais capacitados para o mercado de trabalho. A parceria com o IFBA busca integrar tecnologia e inovação em projetos educacionais e sociais, fortalecendo o impacto positivo na comunidade.</p>
                        <br />
                        <b>Link:</b> <a href="#">link</a>
                    </div>
                </div>
            </div>

        </main>
    );
}