import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Estudiante, Inscripcion, InfoEstudiante, InfoInscripcion} from './inscripcion';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, ModalComponent],
})
export class AppComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  isModalOpen: boolean = false;
  data: Inscripcion[] = [];
  private http = inject(HttpClient);
  codigo: string = '';
  identificacion: string = '';
  nombre: string = '';
  dataEstudiante: InfoEstudiante | undefined;
  // dataEstudiantes: InfoEstudiante[] = [];
  constructor() {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.http.get<Inscripcion[]>('assets/inscripciones.json').subscribe((response: Inscripcion[]) => {
      this.data = response;
      console.log(this.getInfoEstudiantes());
      // console.log(' ');
    });
  }
  getEstudiantes(): Estudiante[] {
    return [...new Map(this.data.map(inscripcion => [inscripcion.estudiante.nombre, inscripcion.estudiante])).values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  getInfoEstudiante(codigo: string): InfoEstudiante {
    const inscripciones: Inscripcion[] = this.data.filter(inscripcion => inscripcion.estudiante.codigo === codigo);
    const estudiante: Estudiante = inscripciones[0].estudiante;
    const info = inscripciones.map(inscripcion => ({
      grupo: inscripcion.grupo,
      notas: inscripcion.notas,
      definitiva: inscripcion.definitiva,
      inasistencia: inscripcion.inasistencia
    }));

    const promedio: number = this.getPromedio(info);
    const rendimiento: string = this.getRendimiento(promedio);
  
    return { estudiante, info, promedio, rendimiento };
  }

  getInfoEstudiantes(): InfoEstudiante[] {return this.getEstudiantes().map(estudiante => this.getInfoEstudiante(estudiante.codigo));
  }


  getPromedio(info: InfoInscripcion[]): number {
    let total = 0;
    info.forEach(inscripcion => total += inscripcion.definitiva);
    return total / info.length;
  }


  getRendimiento(promedio: number): string {
    if (promedio < 3) return 'Deficiente';
    if (promedio < 3.4) return 'Regular';
    if (promedio < 3.9) return 'Aceptable';
    if (promedio < 4.4) return 'Bueno';
    return 'Sobresaliente';
  }

  getDataEstudiante(codigo: string) {
    if (codigo) {
      this.dataEstudiante = this.getInfoEstudiante(codigo);
      if (this.dataEstudiante) {
        this.codigo = this.dataEstudiante.estudiante.codigo;
        this.identificacion = this.dataEstudiante.estudiante.identificacion;
        this.nombre = this.dataEstudiante.estudiante.nombre;
      }
    }
  }
}
