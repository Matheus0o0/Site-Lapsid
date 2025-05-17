import dados from "../mock/data.json";
import { DataMock } from "../types/DataMock";

export async function getDadosMock(): Promise<DataMock> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dados.data as DataMock);
    }, 300);
  });
}
