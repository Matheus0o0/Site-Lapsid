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
            <section>
                <div className={style.ultNewContent}>
                    <h2 className={style.ultNewTitle} >Ultimas notícias</h2>
                    <div className={style.ultNewCard}>
                        <div className={style.ultNewImgContent}>
                            <Image className={style.ultNewImg} src={"CardImgs/Frame(5).svg"} alt="Noticias" width={600} height={300} />
                        </div>
                        <div className={style.ultNewsPrev}>
                            <h2 className={style.ultNewH2}>Lançamento de Nova Plataforma de Educação Digital</h2>
                            <p className={style.ultNewText}>Uma nova plataforma de educação digital foi lançada esta semana, prometendo revolucionar o ensino com recursos de inteligência artificial e gamificação. A ferramenta já está sendo utilizada em escolas piloto e tem recebido feedback positivo de professores e alunos.</p>
                            <div className={style.ultNewAuthor}>
                                {/* <Image className={style.icon} src={"CardImgs/Frame(2).svg"} alt="Noticias" width={150} height={150}/> */}
                                <p> <b>Por</b>: Jhon Doe</p>
                            </div>
                            <div>
                                <p>Data de postagem: 12/02/2025</p>
                            </div>
                            <button className={style.ultNewBtn}>Leia mais</button>
                        </div>
                    </div>
                </div>
            </section>
            <div className={style.divHr}>
                <hr className={style.Hr} />
            </div>
            <section>
                <div>
                    <h2 className={style.ultLastTitle} >Notícias da Semana</h2>
                    <div className={style.allNewsContainer}>
                        {noticias.map(noticia => (
                            <div key={noticia.id} className={style.allNewsCard}>
                                <div key={noticia.id} className={style.allNewsCardContent}>
                                    {noticia.imagem && (
                                        <Image 
                                            className={style.allNewsImg} 
                                            src={noticia.imagem} 
                                            alt={noticia.titulo} 
                                            width={300} 
                                            height={300} 
                                        />
                                    )}
                                    <div className={style.allNewsResume}>
                                        <h3 className={style.allNewsH3}>{noticia.titulo}</h3>
                                        <p>{noticia.conteudo}</p>
                                        <p><b>Data da postagem:</b> {new Date(noticia.data_noticia || '').toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}