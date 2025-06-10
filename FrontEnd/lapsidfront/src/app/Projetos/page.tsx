"use client";
import { getProjetos } from '../../services/projetoService';
import { useEffect, useState } from 'react';
import style from '../Style/Projetos.module.css';
import { Projeto } from '../../services/projetoService';

export default function Projetos() {
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjetos() {
            try {
                setIsLoading(true);
                const data = await getProjetos();
                setProjetos(data);
            } catch (err) {
                setError('Erro ao carregar Projetos');
                console.error('Erro:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProjetos();
    }, []);

    if (isLoading) {
        return <div className={style.loading}>Carregando projetos...</div>;
    }

    if (error) {
        return <div className={style.error}>{error}</div>;
    }

    return (
        <main className={style.main}>
            <h1 className={style.title}>Projetos</h1>
            <section>
                {projetos.map((projeto, index) => (
                    <div key={projeto.id}>
                        <div className={style.prj}>
                            <h2 className={style.h2Prj}>{projeto.titulo}</h2>
                            <div className={style.divPrj}>
                                <div className={style.contentDivPrj}>
                                    <div 
                                        className={style.pPrj}
                                        dangerouslySetInnerHTML={{ __html: projeto.conteudo }}
                                    />
                                    <p><b>Data de criação:</b> {projeto.data_criacao ? new Date(projeto.data_criacao).toLocaleDateString('pt-BR') : 'Indefinida'}</p>
                                    {projeto.autor && (
                                        <p><b>Autor:</b> {projeto.autor}</p>
                                    )}
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
