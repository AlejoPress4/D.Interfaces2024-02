import { Component, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoEstudiante } from '../inscripcion';
import { ViewCounterService } from '../services/view-counter.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnDestroy {
  @Input() dataEstudiante?: InfoEstudiante;
  @ViewChild('dialog') dialogElement!: ElementRef<HTMLDialogElement>;
  
  viewCount: number = 0;
  private sessionTimer: any;
  private readonly SESSION_TIMEOUT = 10000; // cada 10 segundos

  constructor(private viewCounterService: ViewCounterService) {}

  show() {
    if (this.dataEstudiante) {
      this.viewCount = this.viewCounterService.incrementViewCount(this.dataEstudiante.estudiante.codigo);
      this.dialogElement.nativeElement.showModal();
      this.startSessionTimer();
    }
  }

  close() {
    this.dialogElement.nativeElement.close();
    this.clearSessionTimer();
  }

  private startSessionTimer() {
    this.clearSessionTimer();
    this.sessionTimer = setTimeout(() => {
      this.close();
    }, this.SESSION_TIMEOUT);
  }

  private clearSessionTimer() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
  }

  ngOnDestroy() {
    this.clearSessionTimer();
  }

  getRendimientoColor(rendimiento: string): string {
    const colors = {
      'Deficiente': 'text-red-500',
      'Regular': 'text-orange-500',
      'Aceptable': 'text-yellow-500',
      'Bueno': 'text-green-500',
      'Sobresaliente': 'text-emerald-500'
    };
    return colors[rendimiento as keyof typeof colors] || 'text-gray-500';
  }

  getPromedioColor(promedio: number): string {
    if (promedio < 3) return 'text-red-500';
    if (promedio < 3.4) return 'text-orange-500';
    if (promedio < 3.9) return 'text-yellow-500';
    if (promedio < 4.4) return 'text-green-500';
    return 'text-emerald-500';
  }
}

