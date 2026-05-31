import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidatorDateService } from '../../service/validator-date/validator-date.service';

export function dateValidator(): ValidatorFn {
    const service = new ValidatorDateService();

    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;

        if (!service.isValidFormat(control.value)) {
            return { invalidDate: 'Невалідний формат дати' };
        }

        if (!service.isFutureDate(control.value)) {
            return { pastDate: 'Дата має бути в майбутньому' };
        }

        return null;
    };
}