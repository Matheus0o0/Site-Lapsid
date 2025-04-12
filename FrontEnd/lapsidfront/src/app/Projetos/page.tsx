import style from '../Style/Projetos.module.css';
import Image from 'next/image';

export default function Projetos() {
    return (
        <main className={style.main}>
            <h1 className={style.title}>Projetos</h1>
            <section>
                <div className={style.prj}>
                    <h2 className={style.h2Prj}>Projeto 1</h2>
                    <div className={style.divPrj}>
                        <Image className={style.imgPrj} src={"CardImgs/Frame3.svg"} alt="Projeto 1" width={100} height={100}/>
                        <p className={style.pPrj}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, quaerat, omnis fugit at voluptas voluptatum tempora deleniti perferendis alias expedita quos nobis dolores soluta, iusto aperiam dolorum error? Earum vel hic quisquam! Mollitia similique dignissimos eligendi molestias accusantium eveniet minima.</p>
                    </div>
                </div>
                <div className={style.divHr}>
                    <hr className={style.hr}/>
                </div>
                <div className={style.prj}>
                    <h2 className={style.h2Prj}>Projeto 2</h2>
                    <div className={style.divPrj}>
                        <Image className={style.imgPrj} src={"CardImgs/Frame3.svg"} alt="Projeto 1" width={100} height={100}/>
                        <p className={style.pPrj}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, quaerat, omnis fugit at voluptas voluptatum tempora deleniti perferendis alias expedita quos nobis dolores soluta, iusto aperiam dolorum error? Earum vel hic quisquam! Mollitia similique dignissimos eligendi molestias accusantium eveniet minima.</p>
                    </div>
                </div>

            </section>
        </main>
    );
}