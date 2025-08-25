"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getNoticia } from '@/services/noticiaService';
import { Noticia } from '@/types/Noticia';
import style from '../../Style/Noticias.module.css';

export default function NoticiaIndividual() {
    const params = useParams();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.id) {
            fetchNoticia();
        }
    }, [params.id]);

    async function fetchNoticia() {
        try {
            setIsLoading(true);
            const data = await getNoticia(Number(params.id));
            setNoticia(data);
            setError(null);
        } catch (error) {
            setError('Erro ao carregar notícia');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <div className={style.main}>Carregando notícia...</div>;
    if (error) return <div className={style.main}>{error}</div>;
    if (!noticia) return <div className={style.main}>Notícia não encontrada</div>;

    return (
        <main className={style.main}>
            <div className={style.noticiaIndividual}>
                <div className={style.noticiaHeader}>
                    <h1 className={style.noticiaTitulo}>{noticia.titulo}</h1>
                    <div className={style.noticiaMeta}>
                        <p><b>Data de publicação:</b> {new Date(noticia.data_noticia || '').toLocaleDateString()}</p>
                        {noticia.data_atualizacao && (
                            <p><b>Última atualização:</b> {new Date(noticia.data_atualizacao).toLocaleDateString()}</p>
                        )}
                    </div>
                </div>

                {noticia.imagem && (
                    <div className={style.noticiaImagemContainer}>
                        <Image 
                            className={style.noticiaImagem} 
                            src={noticia.imagem} 
                            alt={noticia.titulo} 
                            width={900} 
                            height={500}
                            priority
                        />
                    </div>
                )}

                <div className={style.noticiaConteudo}>
                    <div dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />
                </div>

                <div className={style.noticiaFooter}>
                    <a href="/Noticias" className={style.voltarBtn}>
                        ← Voltar para Notícias
                    </a>
                </div>
            </div>
        </main>
    );
} 