import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { ValidarFechaComponent } from '../features/validar-fecha/validar-fecha.component';
import { ListarFestivosComponent } from '../features/listar-festivos/listar-festivos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'validar-fecha', component: ValidarFechaComponent },
  { path: 'listar-festivos', component: ListarFestivosComponent },
  { path: '**', redirectTo: 'inicio' }
];