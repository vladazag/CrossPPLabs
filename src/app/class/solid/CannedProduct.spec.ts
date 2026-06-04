import { CannedProduct } from './CannedProduct';

describe('CannedProduct testing', () => {
    let canned: CannedProduct;

    beforeEach(() => {
        canned = new CannedProduct('Горошок', 35, 'Жестяна банка');
    });

    it('має створюватись з правильними значеннями', () => {
        expect(canned).toBeTruthy();
        expect(canned.name).toBe('Горошок');
        expect(canned.price).toBe(35);
        expect(canned.packaging).toBe('Жестяна банка');
        expect(canned.category).toBe('Консерви');
    });

    it('displayInfo() має містити категорію, назву і пакування', () => {
        expect(canned.displayInfo()).toContain('Консерви');
        expect(canned.displayInfo()).toContain('Горошок');
        expect(canned.displayInfo()).toContain('Жестяна банка');
    });

    it('має викидати помилку якщо ціна <= 0', () => {
        expect(() => new CannedProduct('Горошок', 0, 'Жестяна банка')).toThrowError('Ціна має бути більше 0');
    });

    it('має викидати помилку якщо ціна від\'ємна', () => {
        expect(() => new CannedProduct('Горошок', -10, 'Жестяна банка')).toThrowError('Ціна має бути більше 0');
    });
});