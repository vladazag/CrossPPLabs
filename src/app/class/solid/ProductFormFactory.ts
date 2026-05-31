import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateValidator } from './dateValidator';

export class ProductFormFactory {
    public static createForm(category: string): FormGroup {
        const base = {
            name: new FormControl('', Validators.required),
            price: new FormControl('', [Validators.required, Validators.min(0.01)])
        };

        if (category === 'Молочні продукти') {
            return new FormGroup({
                ...base,
                fatContent: new FormControl('', Validators.required)
            });
        }

        if (category === 'Овочі') {
            return new FormGroup({
                ...base,
                origin: new FormControl('', Validators.required)
            });
        }

        if (category === 'Напої') {
            return new FormGroup({
                ...base,
                volume: new FormControl('', [Validators.required, Validators.min(0.1)])
            });
        }

        if (category === 'З терміном придатності') {
            return new FormGroup({
                ...base,
                expiryDate: new FormControl('', [Validators.required, dateValidator()])
            });
        }

        return new FormGroup(base);
    }
}