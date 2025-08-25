"use client";

import style from '../Style/Noticias.module.css';
import Image from 'next/image';
import { getNoticias } from '@/services/noticiaService';
import { useEffect, useState } from 'react';
import { Noticia } from '@/types/Noticia';

export default function Noticias() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNoticias();
    }, []);

    async function fetchNoticias() {
        try {
            setIsLoading(true);
            const data = await getNoticias();
            setNoticias(data);
            setError(null);
        } catch (error) {
            setError('Erro ao carregar notícias');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <div>Carregando notícias...</div>;
    if (error) return <div>{error}</div>;

    return (
        <main className={style.main}>
            <h1 className={style.ttlH1}>Notícias</h1>
            {noticias.length > 0 && (
                <section>
                    <div className={style.ultNewContent}>
                        <h2 className={style.ultNewTitle}>Últimas notícias</h2>
                        <div className={style.ultNewCard}>
                            <div className={style.ultNewImgContent}>
                                {noticias[0].imagem ? (
                                    <Image 
                                        className={style.ultNewImg} 
                                        src={noticias[0].imagem} 
                                        alt={noticias[0].titulo} 
                                        width={800} 
                                        height={400} 
                                    />
                                ) : (
                                    <Image 
                                        className={style.ultNewImg} 
                                        src={"CardImgs/Frame(5).svg"} 
                                        alt="Noticias" 
                                        width={800} 
                                        height={400} 
                                    />
                                )}
                            </div>
                            <div className={style.ultNewsPrev}>
                                <h2 className={style.ultNewH2}>{noticias[0].titulo}</h2>
                                <div 
                                    className={style.ultNewText}
                                    dangerouslySetInnerHTML={{ 
                                        __html: noticias[0].conteudo.length > 200 
                                            ? noticias[0].conteudo.substring(0, 200) + '...' 
                                            : noticias[0].conteudo 
                                    }} 
                                />
                                <div className={style.ultNewAuthor}>
                                    <p><b>Data de postagem:</b> {new Date(noticias[0].data_noticia || '').toLocaleDateString()}</p>
                                </div>
                                <a href={`/Noticias/${noticias[0].id}`} className={style.ultNewBtn}>Leia mais</a>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <div className={style.divHr}>
                <hr className={style.Hr} />
            </div>
            <section>
                <div>
                    <h2 className={style.ultLastTitle} >Notícias da Semana</h2>
                    <div className={style.allNewsContainer}>
                        {noticias.slice(1).map(noticia => (
                            <div key={noticia.id} className={style.allNewsCard}>
                                <a href={`/Noticias/${noticia.id}`} className={style.allNewsCardContent}>
                                    {noticia.imagem && (
                                        <Image 
                                            className={style.allNewsImg} 
                                            src={noticia.imagem} 
                                            alt={noticia.titulo} 
                                            width={250} 
                                            height={180} 
                                        />
                                    )}
                                    <div className={style.allNewsResume}>
                                        <h3 className={style.allNewsH3}>{noticia.titulo}</h3>
                                        <div 
                                            dangerouslySetInnerHTML={{ 
                                                __html: noticia.conteudo.length > 150 
                                                    ? noticia.conteudo.substring(0, 150) + '...' 
                                                    : noticia.conteudo 
                                            }} 
                                        />
                                        <p><b>Data da postagem:</b> {new Date(noticia.data_noticia || '').toLocaleDateString()}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}