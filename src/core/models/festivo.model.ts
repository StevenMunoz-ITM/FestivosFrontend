export interface Festivo {
  id?: number;
  nombre: string;
  dia?: number;
  mes?: number;
  diasPascua?: number;
  pais?: {
    id: number;
    nombre: string;
  };
  tipo?: {
    id: number;
    tipo: string;
  };
}
