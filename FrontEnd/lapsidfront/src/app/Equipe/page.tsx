import style from '../Style/Equipe.module.css';

export default function Equipe() {
    return(
        <main className={style.main}>
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
                                <div className={`${style.table_data} ${style.nome_linha}`}>Arquitetura orientada a serviços</div>
                                <div className={style.table_data}>1</div>
                                <div className={style.table_data}>1</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Cidades Inteligentes e internet das coisas (IoT)</div>
                                <div className={style.table_data}>0</div>
                                <div className={style.table_data}>2</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Empreendedorismo Inovador</div>
                                <div className={style.table_data}>0</div>
                                <div className={style.table_data}>2</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Sistemas de Análise a decisão</div>
                                <div className={style.table_data}>0</div>
                                <div className={style.table_data}>2</div>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
            <div className={style.frstTable}>
                <h2>Recursos humanos</h2>
                <div className={style.content}>
                    <div className={style.table}>
                        <div className={style.tableHeader}>
                            <div className={style.header__item}><a id="name" className={style.filter__link} href="#">Pesquisadores</a></div>
                            <div className={style.header__item}><a id="wins" className={style.filter__link} href="#">Titulação máxima</a></div>
                            <div className={style.header__item}><a id="draws" className={style.filter__link} href="#">Data de inclusão</a></div>
                        </div>
                        <div className="table-content">	
                            <div className={style.table_row}>		
                                <div className={`${style.table_data} ${style.nome_linha}`}>Ana Carolina Sokolonski Anton</div>
                                <div className={style.table_data}>Mestrado</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Cleber Jorge Lira de Santana</div>
                                <div className={style.table_data}>Doutorado</div>
                                <div className={style.table_data}>20/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Danilo Santana Souza</div>
                                <div className={style.table_data}>Doutorado</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Fernanda Castelo Branco de Santana</div>
                                <div className={style.table_data}>Mestrado</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>João Paulo Just Peixoto</div>
                                <div className={style.table_data}>Doutorado</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Leandro José Silva Andrade</div>
                                <div className={style.table_data}>Doutorado</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Luan Diego De Lima Pereira</div>
                                <div className={style.table_data}>Mestrado</div>
                                <div className={style.table_data}>24/05/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Raimundo Carvalho Rabelo Filho</div>
                                <div className={style.table_data}>Mestrado Profissional</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Thiago Souto Mendes</div>
                                <div className={style.table_data}>Doutorado</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
            <div className={`${style.frstTable} ${style.Novonome_linha}`}>
                <div className={style.content}>
                    <div className={style.table}>
                        <div className={style.tableHeader}>
                            <div className={style.header__item}><a id="name" className={style.filter__link} href="#">Pesquisadores</a></div>
                            <div className={style.header__item}><a id="wins" className={style.filter__link} href="#">Titulação máxima</a></div>
                            <div className={style.header__item}><a id="draws" className={style.filter__link} href="#">Data de inclusão</a></div>
                        </div>
                        <div className="table-content">	
                            <div className={style.table_row}>		
                                <div className={`${style.table_data} ${style.nome_linha}`}>Anderson Silva Brito</div>
                                <div className={style.table_data}>Graduação</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Marcelo Vitor Ribeiro Santos</div>
                                <div className={style.table_data}>Mestrado Profissional</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                            <div className={style.table_row}>
                                <div className={`${style.table_data} ${style.nome_linha}`}>Ricardo Ramos Passos</div>
                                <div className={style.table_data}>Mestrado Profissional</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
            <div className={`${style.frstTable} ${style.Novonome_linha}`}>
                <div className={style.content}>
                    <div className={style.table}>
                        <div className={style.tableHeader}>
                            <div className={style.header__item}><a id="name" className={style.filter__link} href="#">Pesquisadores</a></div>
                            <div className={style.header__item}><a id="wins" className={style.filter__link} href="#">Titulação máxima</a></div>
                            <div className={style.header__item}><a id="draws" className={style.filter__link} href="#">Data de inclusão</a></div>
                        </div>
                        <div className="table-content">	
                            <div className={style.table_row}>		
                                <div className={`${style.table_data} ${style.nome_linha}`}>Murilo Santos</div>
                                <div className={style.table_data}>Mestrado Profissional</div>
                                <div className={style.table_data}>21/03/2024</div>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>

        </main>
    )
}