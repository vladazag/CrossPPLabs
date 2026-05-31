import { Injectable } from '@angular/core';
import { parseDate } from '../../class/solid/dateUtils';

@Injectable({
    providedIn: 'root'
})
export class ValidatorDateService {
    isFutureDate(dateStr: string): boolean {
        const date = parseDate(dateStr);
        if (!date) return false;
        return date > new Date();
    }

    isValidFormat(dateStr: string): boolean {
        const date = parseDate(dateStr);
        return date !== null;
    }
}