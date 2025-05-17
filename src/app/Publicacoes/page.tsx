"use client";

import { useEffect, useState } from 'react';
import style from '../Style/Publicacoes.module.css';
import { getPublicaoes } from '../../services/publicacaoService';

type Publicacao = {
    id: number;
    titulo: string;
    conteudo: string;
    autor_id: number;
    data_criacao: string;
    data_atualizacao: string
    link: string;
    ano: string
};

export default function Publicacoes() {

    const publicacoes = getPublicaoes();

    return (
        <main className={style.mainPubli}>
            <h1 className={style.title}>Publicações</h1>
            <div className={style.container}>

                {publicacoes.map(pb => (
                    <div key={pb.id}>
                        <h2>{pb.ano}</h2>
                        <ul>
                            <li key={pb.id} className={style.liContent}>
                                <a href={pb.link} target="_blank" rel="noopener noreferrer">
                                    {pb.titulo}
                                </a>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
}
