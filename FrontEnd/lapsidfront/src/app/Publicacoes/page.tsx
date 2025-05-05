"use client";

import { useEffect, useState } from 'react';
import style from '../Style/Publicacoes.module.css';

type Publicacao = {
    id: number;
    titulo: string;
    conteudo: string;
    data_criacao: string;
    data_atualizacao: string | null;
    link: string;
    ano: string;
    autor: string | null;
};

export default function Publicacoes() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        if (!apiUrl) {
            setErro('A URL da API não está definida. Verifique seu .env.');
            return;
        }
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao buscar publicações');
                return response.json();
            })
            .then(data => setPublicacoes(data))
            .catch(err => setErro(err.message));
    }, [apiUrl]);

    const publicacoesPorAno = publicacoes.reduce((acc, pub) => {
        if (!acc[pub.ano]) {
            acc[pub.ano] = [];
        }
        acc[pub.ano].push(pub);
        return acc;
    }, {} as Record<string, Publicacao[]>);

    const anosOrdenados = Object.keys(publicacoesPorAno).sort((a, b) => Number(b) - Number(a));

    return (
        <main className={style.mainPubli}>
            <h1 className={style.title}>Publicações</h1>
            <div className={style.container}>
                {erro && <p>Erro: {erro}</p>}
                {!erro && publicacoes.length === 0 && <p>Carregando publicações...</p>}
                {anosOrdenados.map(ano => (
                    <div key={ano}>
                        <h2>{ano}</h2>
                        <ul>
                            {publicacoesPorAno[ano].map(pub => (
                                <li key={pub.id} className={style.liContent}>
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                        {pub.titulo}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
}
