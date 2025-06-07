"use client";

import { useEffect, useState } from 'react';
import style from '../Style/Publicacoes.module.css';
import { getPublicacoes } from '../../services/publicacaoService';

type Publicacao = {
    id: number;
    titulo: string | null;
    conteudo: string | null;
    autor_id: number | null;
    data_criacao: string | null;
    data_atualizacao: string | null;
    link: string | null;
    ano: string | null;
};

export default function Publicacoes() {
    const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPublicacoes() {
            try {
                setIsLoading(true);
                const data = await getPublicacoes();
                setPublicacoes(data);
            } catch (err) {
                setError('Erro ao carregar publicações');
                console.error('Erro:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPublicacoes();
    }, []);

    if (isLoading) {
        return <div className={style.loading}>Carregando publicações...</div>;
    }

    if (error) {
        return <div className={style.error}>{error}</div>;
    }


    return (
        <main className={style.mainPubli}>
            <h1 className={style.title}>Publicações</h1>
            <div className={style.container}>

                {publicacoes.map(pb => (
                    <div key={pb.id}>
                        <h2>{pb.ano}</h2>
                        <ul>
                            <li key={pb.id} className={style.liContent}>
                                <a href={pb.link ?? undefined} target="_blank" rel="noopener noreferrer">
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
