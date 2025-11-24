import { Pais } from './pais.model';
import { Tipo } from './tipo.model';

export interface Festivo {
  id?: number;
  nombre: string;
  dia?: number;
  mes?: number;
  diasPascua?: number;
  pais?: Pais;
  tipo?: Tipo;
}
