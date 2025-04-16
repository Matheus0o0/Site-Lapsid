import style from '../Style/Parcerias.module.css';
import Image from 'next/image';

export default function Parcerias() {
    return (
        <main className={style.main}>
            <div className={style.container}>
                <h1 className={style.ttlH1}>Parcerias</h1>
                <div className={style.parcContent}>
                    <Image src={"logos/logoufba.svg"} alt="Parcerias" width={200} height={200}/>
                    <div className={style.Parce}>
                        <h2 className={style.h2Parce}>UFBA</h2>
                        <p className={style.pParce}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus libero amet voluptatem, quae qui laborum omnis! Praesentium hic perferendis velit atque! Molestiae voluptas esse veniam optio velit vel placeat facere. Assumenda, eius molestias qui, vel magnam voluptatibus explicabo itaque repellendus nulla nemo aliquam, velit non ipsa amet quisquam necessitatibus? Doloremque natus aut voluptatem recusandae beatae velit voluptates quisquam laborum sint.</p>
                        <br />
                        <b>Link:</b> <a href="#">link</a>
                    </div>
                </div>

                <div className={style.divHr}>
                    <hr className={style.Hr}/>
                </div>

                <div className={style.parcContent}>
                    <Image src={"logos/logoufba.svg"} alt="Parcerias" width={200} height={200}/>
                    <div className={style.Parce}>
                        <h2 className={style.h2Parce}>UFBA</h2>
                        <p className={style.pParce}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus libero amet voluptatem, quae qui laborum omnis! Praesentium hic perferendis velit atque! Molestiae voluptas esse veniam optio velit vel placeat facere. Assumenda, eius molestias qui, vel magnam voluptatibus explicabo itaque repellendus nulla nemo aliquam, velit non ipsa amet quisquam necessitatibus? Doloremque natus aut voluptatem recusandae beatae velit voluptates quisquam laborum sint.</p>
                        <br />
                        <b>Link:</b> <a href="#">link</a>
                    </div>
                </div>
            </div>

        </main>
    );
}