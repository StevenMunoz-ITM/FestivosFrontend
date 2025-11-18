import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ReferenciasMaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
