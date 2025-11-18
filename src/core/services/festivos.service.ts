import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Festivo } from '../models/festivo.model';

@Injectable({
  providedIn: 'root'
})
export class FestivosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/festivos';
  private readonly paisId = 1;

  verificarFecha(anio: number, mes: number, dia: number): Observable<string> {
    return this.http.get<string>(
      `${this.apiUrl}/esfestivo/${this.paisId}/${dia}/${mes}/${anio}`,
      { responseType: 'text' as 'json' }
    );
  }

  obtenerFestivos(anio: number): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.apiUrl}/listar`);
  }
}
