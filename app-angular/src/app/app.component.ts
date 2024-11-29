import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

type Estudiante = {
  nombre: string;
  correo: string;
  fechaNacimiento: string;
  notas: [number, number, number];
  aprueba?: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  private e1: Estudiante;
  title: string;

  constructor() {
    this.title = 'Angular Tutorial';
    this.e1 = {
      nombre: 'Jorge Enrique Pérez',
      correo: 'jperez@ucaldas.edu.co',
      fechaNacimiento: '2012-12-25',
      notas: [3.2, 2.3, 4.1],
    };
    this.e1.aprueba = this.getAprueba();
  }

  getEstudiante(): Estudiante {
    return this.e1;
  }
  
  getPromedio(): number {
    return (
      this.e1.notas.reduce((total: number, nota: number) => (total += nota)) / 3
    );
  }
  
  getAprueba(): boolean {
    return this.getPromedio() >= 3.0;
  }
}




