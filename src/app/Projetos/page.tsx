"use client";
import { getProjetos } from '../../services/projetoService';
import { useEffect, useState } from 'react';
import style from '../Style/Projetos.module.css';
import Image from 'next/image';
import { Projeto } from '@/types/Projeto';

type projeto ={
    id: number;
    titulo: string;
    conteudo: string;
    imagem: string;
    link: string;
    data_criacao?: string;
    data_atualizacao?: string;
}

export default function Projetos() {
    const projetos = getProjetos();

    return (
        <main className={style.main}>
            <h1 className={style.title}>Projetos</h1>
            <section>
                {projetos.map((projeto, index) => (
                    <div key={projeto.id}>
                        <div className={style.prj}>
                            <h2 className={style.h2Prj}>{projeto.titulo}</h2>
                            <div className={style.divPrj}>
                                <Image
                                    className={style.imgPrj}
                                    src={projeto.imagem }
                                    alt={projeto.titulo}
                                    width={100}
                                    height={100}
                                />
                                <div className={style.contentDivPrj}>
                                    <p className={style.pPrj}>{projeto.conteudo}</p>
                                    <p><b>Data de criação:</b> {projeto.data_criacao ? new Date(projeto.data_criacao).toLocaleDateString('pt-BR') : 'Indefinida'}</p>
                                    <p><b>Nome do autor:</b> Null</p>
                                </div>
                            </div>
                        </div>
                        {index < projetos.length - 1 && (
                                <div className={style.divHr}>
                                    <hr className={style.hr} />
                                </div>
                            )}
                    </div>
                ))}
            </section>
        </main>
    );
}
