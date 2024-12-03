import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewCounterService {
  private viewCounts: { [key: string]: number } = {};

  incrementViewCount(studentCode: string): number {
    if (!this.viewCounts[studentCode]) {
      this.viewCounts[studentCode] = 0;
    }
    this.viewCounts[studentCode]++;
    return this.viewCounts[studentCode];
  }

  getViewCount(studentCode: string): number {
    return this.viewCounts[studentCode] || 0;
  }
}

