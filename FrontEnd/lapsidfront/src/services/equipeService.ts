import data from "../mock/data.json";
import { Equipe } from "@/types/Equipe";

export const getEquipe = (): Equipe[] => data.data.equipe;