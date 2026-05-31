import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidatorPriceService {
    isPositive(price: number): boolean {
        return price > 0;
    }

    isReasonable(price: number): boolean {
        return price > 0 && price < 100000;
    }
}