export interface Noticia {
    id: number;
    titulo: string;
    imagem: string | null;
    conteudo: string;
    autor: number | null;
    data_criacao: string | null;
    data_atualizacao: string | null;
    data_noticia: string | null;
    link: string | null;
}