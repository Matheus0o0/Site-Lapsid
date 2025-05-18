const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProjetos() {
    const response = await fetch(`${API_URL}projetos/`);

    if (!response.ok) {
        throw new Error('Erro ao buscar Projetos');
    }

    return response.json();
}
