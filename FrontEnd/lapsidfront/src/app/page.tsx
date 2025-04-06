import style from '../app/Style/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{alignItems: 'center', margin: '0 auto'}}>
      <div className={style.ttlBtn}>
        <h1>Descubra Soluções Inovadoras e 
          <div>
          Avançadas com o 
          <span className={style.spanTtl}>LAPSID!</span>
          </div>
        </h1>
        <button className={style.mainBtn}>
                Conecte-se para acessar sua área de pesquisa e desenvolvimento
            <Image
                className={style.iconArrow}
                src="LogArrow.svg"
                alt="Arrow"
                width={60}
                height={30}
            />
        </button>
      </div>
      <div className={style.allConent}>
            <div className={style.container}>
              <div className={style.fistLine}>
                
                <Image
                className={style.logoLapsid}
                  src="logos/lapsidlogo2.svg"
                  alt="LAPSID Logo"
                  width={500}
                  height={500}
                />
                <h2 className={style.titleArt}>Conheça o LAPSID</h2>
              </div>
              <div className={style.secondLine}>
                <p className={style.text}>
                O LAPSID é um ambiente dinâmico e inovador dedicado à excelência em pesquisa nas áreas de Sistemas de Informação e Decisão. Comprometemo-nos a explorar e avançar o conhecimento em diversas disciplinas, promovendo a integração de teoria e prática para enfrentar os desafios contemporâneos.
                </p>

                <Image
                  className={style.logoIFBA}
                  src="logos/Rectangle6.svg"
                  alt="IFBA Logo"
                  width={500}
                  height={500}
                />
              </div>
            </div>
      </div>
      <div className={style.secondContainer}>
        <h1 className={style.ttl2}>
            <div className={style.titleResearch}>
            <span className={style.spanTtl2}>Linhas de pesquisa do LAPSID: </span>
            Inovação em <div>Tecnologia, Inteligência Artificial e <div>Empreendedorismo</div></div></div>
          </h1>
      </div>



    </main>
  );
}
