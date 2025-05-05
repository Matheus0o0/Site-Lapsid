"use client";

import { useEffect, useState } from 'react';
import style from '../Style/Projetos.module.css';
import Image from 'next/image';

type Projeto = {
    id: number;
    titulo: string;
    conteudo: string;
    data_criacao: string | null;
    data_atualizacao: string | null;
    autor?: string;
    imagem?: string;
};

export default function Projetos() {
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!apiUrl) {
            setErro('Variável de ambiente NEXT_PUBLIC_API_URL não definida');
            setCarregando(false);
            return;
        }

        fetch(`${apiUrl}/projetos`)
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar projetos');
                return res.json();
            })
            .then(data => {
                setProjetos(data);
                setErro(null);
            })
            .catch(err => setErro(err.message))
            .finally(() => setCarregando(false));
    }, [apiUrl]);

    return (
        <main className={style.main}>
            <h1 className={style.title}>Projetos</h1>
            <section>
                {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
                {carregando && <p>Carregando projetos...</p>}
                {!erro && !carregando && projetos.length === 0 && (
                    <p>Nenhum projeto encontrado.</p>
                )}
                {projetos.map((projeto, index) => (
                    <div key={projeto.id}>
                        <div className={style.prj}>
                            <h2 className={style.h2Prj}>{projeto.titulo}</h2>
                            <div className={style.divPrj}>
                                <Image
                                    className={style.imgPrj}
                                    src={projeto.imagem || "CardImgs/Frame(2).svg"}
                                    alt={projeto.titulo}
                                    width={100}
                                    height={100}
                                />
                                <div className={style.contentDivPrj}>
                                    <p className={style.pPrj}>{projeto.conteudo}</p>
                                    <p><b>Data de criação:</b> {projeto.data_criacao ? new Date(projeto.data_criacao).toLocaleDateString('pt-BR') : 'Indefinida'}</p>
                                    {projeto.autor && <p><b>Nome do autor:</b> {projeto.autor}</p>}
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
