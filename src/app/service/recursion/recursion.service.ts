import { Injectable, Optional } from '@angular/core';
import { LogService } from '../logger/log.service';

@Injectable({
  providedIn: 'root',
})
export class RecursionService {
  private yy: number = 0;
  private xy = new Map();
  constructor(@Optional() private logService: LogService) {}
  getRecursion(x: number, currentTerm: number, n: number, sum: number) {
    let min = 1e-6;
    const factor = (0.5 - n + 1) / n;
    currentTerm *= factor * x;
    sum += currentTerm;
    n++;
    if (currentTerm > min || currentTerm < -min) this.getRecursion(x, currentTerm, n, sum);
    else this.yy = sum;
  }
  getTab(xn: number = -1, xk: number = 1, h: number = 0.1) {
    let x = xn, y = 1.0;
    while (x <= xk) {
      this.getRecursion(x, 1, 1, y);
      this.xy.set(x.toFixed(2), this.yy);
      if (this.logService)
        this.logService.write('x = ' + x.toFixed(2) + ', y = ' + this.yy.toFixed(4));
      x = x + h;
    }
    return this.xy;
  }
}
