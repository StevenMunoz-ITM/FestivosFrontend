import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.urlBase}/tipos-festivos`;

  // Endpoint: GET /api/tipos-festivos/listar
  listar(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.apiUrl}/listar`);
  }
}
