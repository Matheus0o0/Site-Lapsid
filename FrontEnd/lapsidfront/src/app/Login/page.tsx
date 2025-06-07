"use client";

import { useState } from 'react';
import { useAuth } from '../context/Auth';
import style from '../Style/Login.module.css'

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className={style.divLogin}>
                <div className={style.contentLogin}>
                    <h1>Login</h1>
                {error && (
                    <div className={`${style.error} ${style.errorMessage}`}>
                        <p>{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className={style.form}>
                    <input
                        className={style.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        className={style.input}
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <button
                        className={`${style.button} ${loading ? style.buttonLoading : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                    </form>
                    <div className={style.text}>
                        <p>Ainda não possui uma conta? <br /> entre em contato com o Lapsid <br /> <a href="/Cadastro">Aqui</a></p>
                    </div>
                </div>
            </div>
    )
}