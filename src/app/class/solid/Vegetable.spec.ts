import { Vegetable } from './Vegetable';

describe('Vegetable testing', () => {
    let vegetable: Vegetable;

    beforeEach(() => {
        vegetable = new Vegetable('Морква', 18, 'Україна');
    });

    it('має створюватись з правильними значеннями', () => {
        expect(vegetable).toBeTruthy();
        expect(vegetable.name).toBe('Морква');
        expect(vegetable.price).toBe(18);
        expect(vegetable.origin).toBe('Україна');
        expect(vegetable.category).toBe('Овочі');
    });

    it('displayInfo() має містити категорію, назву і походження', () => {
        expect(vegetable.displayInfo()).toContain('Овочі');
        expect(vegetable.displayInfo()).toContain('Морква');
        expect(vegetable.displayInfo()).toContain('Україна');
    });

    it('має викидати помилку якщо ціна <= 0', () => {
        expect(() => new Vegetable('Морква', 0, 'Україна')).toThrowError('Ціна має бути більше 0');
    });
});