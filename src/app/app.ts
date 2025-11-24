import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ReferenciasMaterialModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Festivos en Colombia';
  opened = true;
}
