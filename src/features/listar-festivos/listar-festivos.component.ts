import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { FestivosService } from '../../core/services/festivos.service';
import { TipoService } from '../../core/services/tipo.service';
import { Festivo } from '../../core/models/festivo.model';
import { Tipo } from '../../core/models/tipo.model';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { FestivoEditarComponent } from '../../shared/componentes/festivo-editar/festivo-editar.component';
import { DecidirComponent } from '../../shared/componentes/decidir/decidir.component';

@Component({
  selector: 'app-listar-festivos',
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink, 
    ReferenciasMaterialModule,
    NgxDatatableModule
  ],
  templateUrl: './listar-festivos.component.html',
  styleUrls: ['./listar-festivos.component.css']
})
export class ListarFestivosComponent implements OnInit {
  private readonly festivosService = inject(FestivosService);
  private readonly tipoService = inject(TipoService);
  public readonly dialogServicio = inject(MatDialog);
  
  public textoBusqueda: string = "";
  public festivos: Festivo[] = [];
  public tipos: Tipo[] = [];

  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Día", prop: "dia" },
    { name: "Mes", prop: "mes" },
    { name: "Tipo", prop: "tipo.tipo" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public festivoEscogido: Festivo | undefined;
  public indiceFestivoEscogido: number = -1;

  ngOnInit(): void {
    this.listar();
    this.listarTipos();
  }

  escoger(event: any): void {
    if (event.type === "click") {
      this.festivoEscogido = event.row;
      this.indiceFestivoEscogido = this.festivos.findIndex(
        festivo => festivo === this.festivoEscogido
      );
    }
  }

  public listar(): void {
    this.festivosService.listar().subscribe({
      next: (response) => {
        this.festivos = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  public listarTipos(): void {
    this.tipoService.listar().subscribe({
      next: (response) => {
        this.tipos = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  public buscar(): void {
    if (this.textoBusqueda) {
      this.festivosService.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.festivos = response;
        },
        error: (error) => {
          window.alert(error.message);
        }
      });
    } else {
      this.listar();
    }
  }

  agregar(): void {
    const dialogRef = this.dialogServicio.open(FestivoEditarComponent, {
      width: '500px',
      height: '600px',
      data: {
        encabezado: "Agregando un nuevo Festivo",
        festivo: {
          id: 0,
          nombre: "",
          dia: 1,
          mes: 1,
          diasPascua: 0,
          pais: { id: 1, nombre: "Colombia" },
          tipo: this.tipos.length > 0 ? this.tipos[0] : { id: 1, tipo: "" }
        },
        tipos: this.tipos
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (datos) => {
        if (datos) {
          this.festivosService.agregar(datos.festivo).subscribe({
            next: (response) => {
              this.festivosService.buscar(response.nombre).subscribe({
                next: (response) => {
                  this.festivos = response;
                },
                error: (error) => {
                  window.alert(error.message);
                }
              });
            },
            error: (error) => {
              window.alert(error.message);
            }
          });
        }
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  modificar(): void {
    if (this.festivoEscogido) {
      const dialogRef = this.dialogServicio.open(FestivoEditarComponent, {
        width: '500px',
        height: '600px',
        data: {
          encabezado: `Editando el Festivo [${this.festivoEscogido.nombre}]`,
          festivo: this.festivoEscogido,
          tipos: this.tipos
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.festivosService.modificar(datos.festivo).subscribe({
              next: (response) => {
                this.festivos[this.indiceFestivoEscogido] = response;
              },
              error: (error) => {
                window.alert(error.message);
              }
            });
          }
        },
        error: (error) => {
          window.alert(error);
        }
      });
    } else {
      window.alert("Se debe elegir un Festivo de la lista");
    }
  }

  eliminar(): void {
    if (this.festivoEscogido) {
      const dialogRef = this.dialogServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `¿Está seguro de eliminar el Festivo [${this.festivoEscogido.nombre}]?`,
          id: this.festivoEscogido.id
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: (datos) => {
          if (datos && datos.id) {
            this.festivosService.eliminar(datos.id).subscribe({
              next: () => {
                this.listar();
                window.alert("El Festivo fue eliminado exitosamente");
              },
              error: (error) => {
                window.alert("Error al eliminar: " + (error.message || 'No se pudo eliminar el festivo'));
              }
            });
          }
        }
      });
    } else {
      window.alert("Se debe elegir un Festivo de la lista");
    }
  }
}
