import React from 'react';
import Map from '../Components/Map';
import style from '../Style/Contatos.module.css';
export default function Contatos() {
    return (
        <main className={style.main}>
            <h1 className={style.title}>Contatos</h1>
            <section className={style.sectionCont}>
                    <div className={style.divCont}>

                        <div className={style.text}>
                        
                        <ul className={style.ulCont}>
                        <h3><b>Endereço:</b></h3>
                            <li className={style.liCont} >BR-324, Km 521 - Aviário, Feira de Santana - BA, 44096-486</li>
                        </ul>
                      
                        <ul className={style.ulCont}>
                        <h3><b>Telefone:</b></h3>
                            <li className={style.liCont}>(75) 9 9999-999</li>
                        </ul>
                    
                        <ul >
                        <h3><b>Email:</b></h3>
                            <li className={style.liCont}>lapsid&#64;ifba.edu.br</li>
                        </ul>
                        </div>

                        <Map/>
                    </div>
            </section>

        </main>
    );
}