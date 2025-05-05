"use client";

import { useEffect, useState } from 'react';
import style from '../Style/Parcerias.module.css';

type Parceria = {
    id: number;
    nome_parceria: string;
    descricao: string;
    data_criacao: string | null;
    data_atualizacao: string | null;
    link?: string;
};

export default function Parcerias() {
    const [parcerias, setParcerias] = useState<Parceria[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!apiUrl) {
            setErro('Variável de ambiente NEXT_PUBLIC_API_URL não definida');
            setCarregando(false);
            return;
        }

        fetch(`${apiUrl}/parcerias`)
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar parcerias');
                return res.json();
            })
            .then(data => {
                setParcerias(data);
                setErro(null);
            })
            .catch(err => setErro(err.message))
            .finally(() => setCarregando(false));
    }, [apiUrl]);

    return (
        <main className={style.main}>
            <div className={style.container}>
                <h1 className={style.ttlH1}>Parcerias</h1>

                {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
                {carregando && <p>Carregando parcerias...</p>}

                {!erro && !carregando && parcerias.length === 0 && (
                    <p>Nenhuma parceria encontrada.</p>
                )}

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
