import {Usuario} from "./Usuario"
import {Publicacao} from "./Publicacao"
import {Noticia} from "./Noticia"
import {Parceria} from "./Parceria"
import {ConteudoPagina} from "./ConteudoPagina"
import {Relatorio} from "./relatorio"
import {Projeto} from "./Projeto"

export interface DataMock {
        usuarios: Usuario[];
        publicacoes: Publicacao[];
        noticias: Noticia[];
        parcerias: Parceria[];
        conteudo_paginas: ConteudoPagina[];
        relatorio: Relatorio[];
        projetos: Projeto[];
}