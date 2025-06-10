"use client";

import { useEffect, useState } from 'react';
import style from '../Style/Parcerias.module.css';
import { get } from 'http';
import { getParcerias } from '@/services/parceriaService';
import Image from 'next/image';

type Parceria = {
    id: number;
    nome_parceria: string;
    imagem_url: string;
    descricao: string;
    data_criacao: string;
    data_atualizacao: string;
};

export default function Parcerias() {
    const [parcerias, setParcerias] = useState<Parceria[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);   

    useEffect(() => {
        async function fetchParcerias() {
            try {
                setIsLoading(true);
                const data = await getParcerias();
                setParcerias(data);
            } catch (err) {
                setError('Erro ao carregar Parcerias');
                console.error('Erro:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchParcerias();
    }, []);

    if (isLoading) {
        return <div className={style.loading}>Carregando Parcerias...</div>;
    }

    if (error) {
        return <div className={style.error}>{error}</div>;
    }

    return (
        <main className={style.main}>
            <div className={style.container}>
                <h1 className={style.ttlH1}>Parcerias</h1>

                {parcerias.map((parceria, index) => (
                    <div key={parceria.id}>
                        <div className={style.parcContent}>
                            <div className={style.Parce}>
                                {parceria.imagem_url && (
                                    <div className={style.imageContainer}>
                                        <Image
                                            src={parceria.imagem_url}
                                            alt={parceria.nome_parceria}
                                            width={300}
                                            height={200}
                                            className={style.parceriaImage}
                                        />
                                    </div>
                                )}
                                <h2 className={style.h2Parce}>{parceria.nome_parceria}</h2>
                                <p className={style.pParce}>{parceria.descricao}</p>

                                {parceria.data_criacao && (
                                    <p className={style.pParce}>
                                        <strong>Criado em:</strong>{' '}
                                        {new Date(parceria.data_criacao).toLocaleDateString('pt-BR')}
                                    </p>
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
