import { Beverage } from './Beverage';

describe('Beverage testing', () => {
    let beverage: Beverage;

    beforeEach(() => {
        beverage = new Beverage('Сік', 65, 1);
    });

    it('має створюватись з правильними значеннями', () => {
        expect(beverage).toBeTruthy();
        expect(beverage.name).toBe('Сік');
        expect(beverage.price).toBe(65);
        expect(beverage.volume).toBe(1);
        expect(beverage.category).toBe('Напої');
    });

    it('displayInfo() має містити категорію, назву і об\'єм', () => {
        expect(beverage.displayInfo()).toContain('Напої');
        expect(beverage.displayInfo()).toContain('Сік');
        expect(beverage.displayInfo()).toContain('1');
    });

    it('має викидати помилку якщо ціна <= 0', () => {
        expect(() => new Beverage('Сік', -5, 1)).toThrowError('Ціна має бути більше 0');
    });
});