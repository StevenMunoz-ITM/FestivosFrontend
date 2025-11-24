import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Festivo } from '../models/festivo.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FestivosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.urlBase}/festivos`;
  private readonly paisId = 1; // Colombia por defecto

  // Endpoint: GET /api/festivos/es-festivo?fecha=YYYY-MM-DD&paisId=1
  verificarFecha(anio: number, mes: number, dia: number): Observable<string> {
    const fecha = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('paisId', this.paisId.toString());
    
    return this.http.get(`${this.apiUrl}/es-festivo`, { 
      params, 
      responseType: 'text' 
    });
  }

  // Endpoint: GET /api/festivos/listar
  listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.apiUrl}/listar`);
  }

  // Endpoint: GET /api/festivos/buscar?nombre=texto
  buscar(nombre: string): Observable<Festivo[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Festivo[]>(`${this.apiUrl}/buscar`, { params });
  }

  // Endpoint: POST /api/festivos
  agregar(festivo: Festivo): Observable<Festivo> {
    // Adaptar al DTO que espera la API
    const festivoDTO = this.toDTO(festivo);
    return this.http.post<Festivo>(this.apiUrl, festivoDTO);
  }

  // Endpoint: PUT /api/festivos/{id}
  modificar(festivo: Festivo): Observable<Festivo> {
    const festivoDTO = this.toDTO(festivo);
    return this.http.put<Festivo>(`${this.apiUrl}/${festivo.id}`, festivoDTO);
  }

  // Endpoint: DELETE /api/festivos/{id}
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Endpoint: GET /api/festivos/pais/{paisId}
  obtenerPorPais(paisId: number): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.apiUrl}/pais/${paisId}`);
  }

  // Mantener compatibilidad con el componente ValidarFecha
  obtenerFestivos(anio: number): Observable<Festivo[]> {
    return this.listar();
  }

  // Método auxiliar para convertir el modelo a DTO
  private toDTO(festivo: Festivo): any {
    return {
      id: festivo.id,
      nombre: festivo.nombre,
      dia: festivo.dia,
      mes: festivo.mes,
      diasPascua: festivo.diasPascua,
      paisId: festivo.pais?.id || this.paisId,
      tipoFestivoId: festivo.tipo?.id
    };
  }
}
