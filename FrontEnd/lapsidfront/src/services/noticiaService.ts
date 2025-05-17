import data from "../mock/data.json";
import { Noticia } from "@/types/Noticia";

export const getNoticias = (): Noticia[] => data.data.noticias;