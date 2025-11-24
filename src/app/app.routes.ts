import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { ValidarFechaComponent } from '../features/validar-fecha/validar-fecha.component';
import { ListarFestivosComponent } from '../features/listar-festivos/listar-festivos.component';
import { TiposFestivoComponent } from '../features/tipos-festivo/tipos-festivo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'validar-fecha', component: ValidarFechaComponent },
  { path: 'festivos', component: ListarFestivosComponent },
  { path: 'tipos-festivo', component: TiposFestivoComponent },
  { path: 'listar-festivos', redirectTo: 'festivos', pathMatch: 'full' }, // Redirección para compatibilidad
  { path: '**', redirectTo: 'inicio' }
];