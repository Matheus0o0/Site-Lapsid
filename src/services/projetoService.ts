import { Projeto } from "@/types/Projeto";
import dados from "../mock/data.json";

export const getProjetos = (): Projeto[] => dados.data.projetos;