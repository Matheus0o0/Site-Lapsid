const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPublicaoes() {
    const response = await fetch(`${API_URL}publicacoes/`);

    if (!response.ok) {
        throw new Error('Erro ao buscar publicações');
    }

    return response.json();
}