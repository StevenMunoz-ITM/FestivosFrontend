import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { TipoService } from '../../core/services/tipo.service';
import { Tipo } from '../../core/models/tipo.model';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-tipos-festivo',
  imports: [
    CommonModule,
    FormsModule,
    ReferenciasMaterialModule,
    NgxDatatableModule
  ],
  templateUrl: './tipos-festivo.component.html',
  styleUrls: ['./tipos-festivo.component.css']
})
export class TiposFestivoComponent implements OnInit {
  private readonly tipoService = inject(TipoService);

  public tipos: Tipo[] = [];
  public columnas = [
    { name: "ID", prop: "id", width: 80 },
    { name: "Tipo de Festivo", prop: "tipo" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public tipoEscogido: Tipo | undefined;
  public indiceTipoEscogido: number = -1;

  ngOnInit(): void {
    this.listar();
  }

  escoger(event: any): void {
    if (event.type === "click") {
      this.tipoEscogido = event.row;
      this.indiceTipoEscogido = this.tipos.findIndex(
        tipo => tipo === this.tipoEscogido
      );
    }
  }

  public listar(): void {
    this.tipoService.listar().subscribe({
      next: (response) => {
        this.tipos = response;
      },
      error: (error) => {
        window.alert("Error al cargar tipos: " + error.message);
      }
    });
  }
}
