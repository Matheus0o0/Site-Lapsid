import { Usuario } from "@/types/Usuario";
import dados from "../mock/data.json";

export const getUsuarios = (): Usuario[] => dados.data.usuarios;