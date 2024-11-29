import { Component, OnInit, inject, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, } from '@angular/common/http';
import { Inscripcion } from './inscripcion';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule],
})

export class AppComponent implements OnInit {
  data: Inscripcion[] = [];
  private http = inject(HttpClient); 

  constructor() { 
    console.log(this.data);
  }

  ngOnInit(): void {
    this.http
      .get<Inscripcion[]>('./assets/inscripciones.json')
      .subscribe((response: Inscripcion[]) => {
        console.log(response);
        this.data = response;
        // … otras pruebas …
      });
  }
}