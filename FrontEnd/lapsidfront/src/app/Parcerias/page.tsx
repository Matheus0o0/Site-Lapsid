"use client";

import { useEffect, useState } from 'react';
import style from '../Style/Parcerias.module.css';
import { get } from 'http';
import { getParcerias } from '@/services/parceriaService';


type Parceria ={
    id: number;
    nome_parceria: string;
    imagem: string;
    descricao: string;
    data_criacao: string;
    data_atualizacao: string;
    link: string;
};

export default function Parcerias() {
    const parcerias:Parceria[] = getParcerias();

    return (
        <main className={style.main}>
            <div className={style.container}>
                <h1 className={style.ttlH1}>Parcerias</h1>

                {parcerias.map((parceria, index) => (
                    <div key={parceria.id}>
                        <div className={style.parcContent}>
                            <div className={style.Parce}>
                                <h2 className={style.h2Parce}>{parceria.nome_parceria}</h2>
                                <p className={style.pParce}>{parceria.descricao}</p>

                                {parceria.data_criacao && (
                                    <p className={style.pParce}>
                                        <strong>Criado em:</strong>{' '}
                                        {new Date(parceria.data_criacao).toLocaleDateString('pt-BR')}
                                    </p>
                                )}

                                {parceria.link ? (
                                    <p>
                                        <strong>Link:</strong>{' '}
                                        <a href={parceria.link} target="_blank" rel="noopener noreferrer">
                                            {parceria.link}
                                        </a>
                                    </p>
                                ) : (
                                    <p><strong>Link:</strong> Não disponível</p>
                                )}
                            </div>
                        </div>

                        {index < parcerias.length - 1 && (
                            <div className={style.divHr}>
                                <hr className={style.Hr} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}
