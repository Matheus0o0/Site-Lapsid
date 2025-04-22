import style from '../Style/Publicacoes.module.css';
export default function Publicacoes() {
    return (
        <main className={style.mainPubli}>
            <h1 className={style.title}>Publicações</h1>
            <div className={style.container}>
                <div>
                    <h2>2024</h2>
                    <ul>
                        <li className={style.liContent}><a href="#">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eaque omnis ipsam commodi, accusantium ipsum corporis corrupti ipsa quasi optio?</a></li>    
                    </ul>   
                </div>
                <div>
                    <h2>2023</h2>
                    <ul>
                        <li className={style.liContent}><a href="#">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, debitis impedit sit sunt reiciendis eos architecto magni tempore. Ab provident culpa consectetur obcaecati dignissimos iusto?</a></li>
                        <li className={style.liContent}><a href="#">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, debitis impedit sit sunt reiciendis eos architecto magni tempore. Ab provident culpa consectetur obcaecati dignissimos iusto?</a></li>     
                    </ul>   
                </div>
                <div>
                    <h2>2025</h2>
                    <ul>
                        <li className={style.liContent}><a href="#">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum alias sit quis obcaecati blanditiis numquam ipsum rerum?</a></li>    
                    </ul>   
                </div>
            </div>
        </main>
    );
}