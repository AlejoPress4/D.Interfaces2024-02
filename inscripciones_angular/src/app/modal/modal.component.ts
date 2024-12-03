import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoEstudiante } from '../inscripcion';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() dataEstudiante?: InfoEstudiante;
  @Input() onClose: () => void = () => {};
  @ViewChild('dialog') dialogElement!: ElementRef<HTMLDialogElement>;

  show() {
    this.dialogElement.nativeElement.showModal();
  }

  close() {
    this.dialogElement.nativeElement.close();
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

