import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { FestivosService } from '../../core/services/festivos.service';

@Component({
  selector: 'app-validar-fecha',
  imports: [CommonModule, FormsModule, RouterLink, ReferenciasMaterialModule],
  templateUrl: './validar-fecha.component.html',
  styleUrls: ['./validar-fecha.component.css']
})
export class ValidarFechaComponent {
  private readonly festivosService = inject(FestivosService);
  
  protected selectedDate = signal<Date | null>(null);
  protected resultado = signal<string>('');
  protected loading = signal<boolean>(false);

  validarFecha(): void {
    const fecha = this.selectedDate();
    if (!fecha) {
      this.resultado.set('Por favor selecciona una fecha');
      return;
    }

    this.loading.set(true);
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();

    this.festivosService.verificarFecha(año, mes, dia).subscribe({
      next: (response) => {
        this.resultado.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al verificar fecha:', error);
        this.resultado.set('Error al verificar la fecha');
        this.loading.set(false);
      }
    });
  }
}
