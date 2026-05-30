import { DairyProduct } from './DairyProduct';

describe('Product (abstract) testing', () => {
    let product: DairyProduct;

    beforeEach(() => {
        product = new DairyProduct('Молоко', 45.5, 2.5);
    });

    it('має створюватись з правильними значеннями', () => {
        expect(product).toBeTruthy();
        expect(product.name).toBe('Молоко');
        expect(product.price).toBe(45.5);
        expect(product.category).toBe('Молочні продукти');
    });

    it('getInfo() має повертати назву і ціну', () => {
        expect(product.getInfo()).toContain('Молоко');
        expect(product.getInfo()).toContain('45.5');
    });

    it('має викидати помилку якщо ціна <= 0', () => {
        expect(() => new DairyProduct('Молоко', -10, 2.5)).toThrowError('Ціна має бути більше 0');
    });

    it('має викидати помилку якщо ціна = 0', () => {
        expect(() => new DairyProduct('Молоко', 0, 2.5)).toThrowError('Ціна має бути більше 0');
    });
});