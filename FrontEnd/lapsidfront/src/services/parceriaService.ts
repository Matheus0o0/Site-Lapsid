const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getParcerias() {
    const response = await fetch(`${API_URL}parcerias/`);
    if(!response){
        throw new Error('Erro ao buscar Parcerias');
    }

    return response.json();
}