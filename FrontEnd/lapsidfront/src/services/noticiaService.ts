const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getNoticias() {
    const response = await fetch(`${API_URL}noticias/`);

    if (!response.ok) {
        throw new Error('Erro ao buscar Noticias');
    }

    return response.json();
}
