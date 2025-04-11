import style from '../Style/Equipe.module.css';

export default function Equipe() {
    return(
        <main>
            <div className={style.containerTtl}>
                <h1 className={style.ttlH1}>Venha conhecer a equipe da <span className={style.spanTtl}>LAPSID!</span></h1>
            </div>
            <div className={style.containerIndent}>
                <h2>Identificação</h2>
                <ul>
                    <li><b>Situação do grupo: </b> Certificado</li>
                    <li><b>Ano de formação:</b> 2024</li>
                    <li><b>Data de situação:</b> 23/02/2024 16:37</li>
                    <li><b>Data de último envio:</b> 24/05/2024 13:56</li>
                    <li><b>Líder(es) do grupo:</b> Cleber Jorge Lira de Santana</li>
                    <li><b>Área predominante:</b> Ciências Exatas e da Terra; Ciência da Computação</li>
                    <li><b>Instutuição do grupo:</b> Instituto Federal da Bahia - IFBA</li>
                    <li><b>Unidade:</b> IFBA - Campus Feira de Santana</li>
                </ul>
            </div>
            <div className={style.frstTable}>
            <h2>Linhas de pesquisa</h2>
            <div className={style.content}>
                <div className={style.table}>
                    <div className={style.tableHeader}>
                        <div className={style.header__item}><a id="name" className={style.filter__link} href="#">Nome da linha de pesquisa</a></div>
                        <div className={style.header__item}><a id="wins" className={style.filter__link} href="#">Quantidade de estudantes</a></div>
                        <div className={style.header__item}><a id="draws" className={style.filter__link} href="#">Quantidade de pesquisadores</a></div>
                    </div>
                    <div className="table-content">	
                        <div className={style.table_row}>		
                            <div className={`${style.table_data} ${style.nome_linha}`}>Engenharia de Software</div>
                            <div className={style.table_data}>2</div>
                            <div className={style.table_data}>0</div>
                        </div>
                        <div className={style.table_row}>
                            <div className={style.table_data}>Arquitetura orientada a serviços</div>
                            <div className={style.table_data}>1</div>
                            <div className={style.table_data}>1</div>
                        </div>
                        <div className={style.table_row}>
                            <div className={style.table_data}>Cidades Inteligentes e internet das coisas (IoT)</div>
                            <div className={style.table_data}>0</div>
                            <div className={style.table_data}>2</div>
                        </div>
                        <div className={style.table_row}>
                            <div className={style.table_data}>Empreendedorismo Inovador</div>
                            <div className={style.table_data}>0</div>
                            <div className={style.table_data}>2</div>
                        </div>
                        <div className={style.table_row}>
                            <div className={style.table_data}>Sistemas de Análise a decisão</div>
                            <div className={style.table_data}>0</div>
                            <div className={style.table_data}>2</div>
                        </div>
                    </div>	
                </div>
            </div>
            </div>

        </main>

    )
}