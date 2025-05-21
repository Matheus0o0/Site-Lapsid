import style from '../Style/Login.module.css'
export default function Login() {
    return (
        <>
            <div className={style.divLogin}>
                <div className={style.contentLogin}>
                    <h1>Login</h1>
                    <form action="#" className={style.form}>
                        <input className={style.input} type="email" placeholder="Email" />
                        <input className={style.input} type="password" placeholder="Senha" />
                        <button className={style.button} type="submit">Entrar</button>
                    </form>
                    <div className={style.text}>
                        <p>Ainda não possui uma conta? <br /> entre em contato com o Lapsid <br /> <a href="/Cadastro">Aqui</a></p>
                    </div>
                </div>
            </div>

        </>

    )
}