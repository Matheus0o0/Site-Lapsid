import style from '../app/Style/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <main className={style.main} style={{alignItems: 'center', margin: '0 '}}>
      <div className={style.ttlBtn}>
        <h1>Descubra Soluções Inovadoras e 
          <span className={style.spanTtl}> LAPSID!</span>
        </h1>
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
              <div className={style.spanTtl2}>
                Linhas de pesquisa do LAPSID: 
              </div>
              <div>Inovação em Tecnologia, Inteligência Artificial e</div>
              <div>Empreendedorismo</div>
            </div>
          </h1>
      </div>
      <section className={style.cardSection}>
          <div className={style.parentCard}>
              <div className={style.divCard1}>
                <div className={style.divCard1Content}><span className={style.spanCard1}><b>Arquitetura Orientada a Serviços</b></span>
                    <div>Investigamos soluções arquiteturais que promovem a flexibilidade e escalabilidade dos sistemas, centradas no uso eficaz de serviços para otimizar a entrega de funcionalidades.
                    </div>
                </div>
              </div>
              <div className={style.divCard2}>
                <div className={style.divCard2Content}>
                  <h3 className={style.divCard2Title}>Internet das Coisas (IoT)</h3>
                  <p style={{fontSize: '1em'}} className={style.divCard2P}>Exploramos as vastas possibilidades oferecidas pela interconexão de dispositivos, buscando soluções inovadoras que impulsionem a IoT e suas aplicações em diversas áreas, desde a indústria até o cotidiano.</p>
                  {/* <Image className={style.cardImg2} src="CardImgs/Frame(2).svg" alt="LAPSID Logo" width={300} height={500}/> */}
                </div>
              </div>
              <div className={style.divCard3}>
              <div className={style.divCard3Content}>
                  <h3 className={style.divCard3Title}>Internet das Coisas (IoT)</h3>
                  <p style={{fontSize: '1em'}} className={style.divCard3P}>Exploramos as vastas possibilidades oferecidas pela interconexão de dispositivos, buscando soluções inovadoras que impulsionem a IoT e suas aplicações em diversas áreas, desde a indústria até o cotidiano.</p>
                  {/* <Image className={style.cardImg2} src="CardImgs/Frame(2).svg" alt="LAPSID Logo" width={300} height={500}/> */}
                </div>
              </div>
              <div className={style.divCard4}>
                <div className={style.divCard4Content}>
                  <h3 className={style.divCard4Title}>Empreendedorismo Inovador</h3>
                  <p style={{fontSize: '1em'}} className={style.divCard4P}>Encorajamos o espírito empreendedor, investigando estratégias e práticas inovadoras.</p>
                  {/* <Image className={style.cardImg1}  src="CardImgs/Frame(1).svg" alt="LAPSID Logo" width={400} height={400}/> */}
                </div>
              </div>
              <div className={style.divCard5}><Image className={style.logoLapsid2} src="logos/lapsidlogo2.svg" alt="LAPSID Logo" width={300} height={500}/></div>
              <div className={style.divCard6}>
                <div className={style.divCard6Content}>
                  <h3 className={style.divCard6Title}>Engenharia de Software</h3>
                  <p style={{fontSize: '1em'}} className={style.divCard6P}>Comprometidos em aprimorar práticas de desenvolvimento de software, estudamos metodologias ágeis, boas práticas de engenharia de software e técnicas avançadas para melhorar a qualidade e eficiência dos produtos desenvolvidos.</p>
                {/* <Image className={style.cardImg3} src="CardImgs/Frame3.svg" alt="LAPSID Logo" width={300} height={500}/> */}
                </div>

              </div>
              <div className={style.divCard7}>
                <div className={style.divCard7Content}>
                  <h2 className={style.divCard7Title}>
                    Conectando <br /> ideias, <br /> aumentando a inovação
                  </h2>
                </div>
              </div>
              <div className={style.divCard8}><Image className={style.cardImg4} src="CardImgs/Frame(5).svg" alt="LAPSID Logo" width={300} height={500}/></div>
          </div>
      </section>
      <section>

        <div className={style.gestContent}>
          <h1 className={style.gesth1}>Gestão do conhecimento</h1>
        </div>

        <div className={style.gestDesc}>
          <h2 className={style.gestH2}>Parcerias:</h2>
          <li className={style.gestLi}>
            <ul className={style.gestUl}><p>ÌmòLab - Laboratório de Inovação em Gestão e Computação Aplicada (UFBA)</p></ul>
          </li>

        </div>
        <div className={style.divHr}>
          <hr className={style.gestHr}/>
        </div>
        <div className={style.gestDesc}>
          <h2 className={style.gestH2}>Projetos:</h2>
          <li className={style.gestLi}>
            <ul className={style.gestUl}>
              <h3 className={style.gestH3}>Inovar para pessoas negras</h3>
                  <p className={style.gestP}>O projeto visa mobilizar o desenvolvimento colaborativo de pesquisas científicas em inovação no que diz respeito a dois
                  eixos conceituais científicos: a) Inovação social, através do desenvolvimento de soluções de negócios digitais que
                  impactem no desenvolvimento social de pessoas negras, empreendedores e trabalhadores informais; b) Inovação
                  computacional, a partir da implementação de soluções tecnológicas, que impactem no avanço científico e aplicado da
                  Engenharia de Software, Inteligência Artificial e Ciência de Dados em negócios digitais.
                  Nesse sentido, os tópicos chaves de investigação são: Gestão e Processos de Negócios Digitais; Ciência de Dados;
                  Desenvolvimento de Software; Inovação Tecnológica e Gestão da Diversidade.</p>
                </ul>
              <ul className={style.gestUl}>
                <h3 className={style.gestH3}>NuFuturo - Parceria IFBA - UFBA - Nubank</h3>
                  <p className={style.gestP}>Projeto de PD&I centrado na formação dos alunos. Em particular, ao final de sua jornada pelo projeto, visamos fazer com
                  que o aluno seja capaz de: Identificar e modelar problemas avançados nos quais as técnicas das áreas de concentração
                  do programa podem se aplicar; Analisar, projetar, implementar, avaliar e documentar soluções para problemas os
                  inseridos no escopo do programa; Compreender e dominar meios de implantar os valores importantes dentro do contexto
                  do programa, sejam eles técnicos, como abordagens centradas no usuário, agilidade e excelência técnica, sejam eles
                  além-técnicos, como liderança positiva, respeito à diversidade, capacidade de análise crítica, atenção à questões sociais,
                  entre outros; Colaborar de forma efetiva em projetos reais, entendendo o seu papel, suas responsabilidades e
                  respeitando a diversidade da equipe.</p>
                </ul>
          </li>

        </div>

      </section>
    </main>
  );
}

