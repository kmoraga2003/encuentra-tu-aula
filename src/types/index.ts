export interface Aula {
  sala: string;
  codigo: string;
  codigoNormalizado: string;
  piso: number | string;
  pabellon: string;
  edificio: string;
  sede: string;
  direccion: string;
  mensajeOrientacion?: string;
  [key: string]: any;
}

export interface HistoryItem {
  id: number;
  codigo: string;
  aulaData: Aula;
  timestamp: string;
}
