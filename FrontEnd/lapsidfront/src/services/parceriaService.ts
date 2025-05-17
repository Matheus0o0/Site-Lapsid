import data from "../mock/data.json";
import { Parceria } from "@/types/Parceria";

export const getParcerias = (): Parceria[] => data.data.parcerias;