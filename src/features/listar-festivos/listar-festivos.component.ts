import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { FestivosService } from '../../core/services/festivos.service';
import { Festivo } from '../../core/models/festivo.model';

@Component({
  selector: 'app-listar-festivos',
  imports: [CommonModule, FormsModule, RouterLink, ReferenciasMaterialModule],
  templateUrl: './listar-festivos.component.html',
  styleUrls: ['./listar-festivos.component.css']
})
export class ListarFestivosComponent {
  private readonly festivosService = inject(FestivosService);
  
  protected anio = signal<number>(new Date().getFullYear());
  protected festivos = signal<Festivo[]>([]);
  protected loading = signal<boolean>(false);
  protected displayedColumns: string[] = ['festivo', 'fecha'];

  obtenerFestivos(): void {
    this.loading.set(true);
    
    this.festivosService.obtenerFestivos(this.anio()).subscribe({
      next: (data) => {
        this.festivos.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al obtener festivos:', error);
        this.loading.set(false);
      }
    });
  }
}
