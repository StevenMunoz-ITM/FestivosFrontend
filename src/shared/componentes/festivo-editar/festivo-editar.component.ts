import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Festivo } from '../../../core/models/festivo.model';
import { Tipo } from '../../../core/models/tipo.model';

export interface DatosEdicionFestivo {
  encabezado: string;
  festivo: Festivo;
  tipos: Tipo[];
}

@Component({
  selector: 'app-festivo-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './festivo-editar.component.html',
  styleUrls: ['./festivo-editar.component.css']
})
export class FestivoEditarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionFestivo) {}

  compararTipos(t1: Tipo, t2: Tipo): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
}
