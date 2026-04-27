import { Injectable, Optional } from '@angular/core';
import { LogService } from '../logger/log.service';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private xy = new Map();
  constructor(@Optional() private logService: LogService) {}
  getSeries(x: number) {
    let sum: number = 1, currentTerm = sum, min = 1e-6;
    for (let n = 1; currentTerm > min || currentTerm < -min; n++) {
      const factor = (0.5 - n + 1) / n;
      currentTerm *= factor * x;
      sum += currentTerm;
    }
    return sum;
  }
  getTab(xn: number = -1, xk: number = 1, h: number = 0.1) {
    let x = xn, y = 0.0;
    while (x < xk) {
      y = this.getSeries(x);
      this.xy.set(x.toFixed(2), y);
      if (this.logService)
        this.logService.write('x = ' + x.toFixed(2) + ', y = ' + y.toFixed(4));
      x = x + h;
    }
    return this.xy;
  }
}
