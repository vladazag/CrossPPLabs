import { PerishableProduct } from './PerishableProduct';

describe('PerishableProduct testing', () => {
    let fresh: PerishableProduct;
    let expired: PerishableProduct;

    beforeEach(() => {
        fresh = new PerishableProduct('Йогурт', 35, 'З терміном придатності', '2099-01-01');
        expired = new PerishableProduct('Вершки', 55, 'З терміном придатності', '2000-01-01');
    });

    it('має створюватись з правильними значеннями', () => {
        expect(fresh).toBeTruthy();
        expect(fresh.name).toBe('Йогурт');
        expect(fresh.price).toBe(35);
        expect(fresh.expiryDate).toBe('2099-01-01');
    });

    it('isExpired() має повертати false для свіжого продукту', () => {
        expect(fresh.isExpired()).toBeFalse();
    });

    it('isExpired() має повертати true для простроченого продукту', () => {
        expect(expired.isExpired()).toBeTrue();
    });

    it('displayInfo() має містити термін придатності', () => {
        expect(fresh.displayInfo()).toContain('2099-01-01');
        expect(fresh.displayInfo()).toContain('Придатний');
        expect(expired.displayInfo()).toContain('Прострочено');
    });

    it('має викидати помилку якщо ціна <= 0', () => {
        expect(() => new PerishableProduct('Йогурт', 0, 'З терміном придатності', '2099-01-01'))
        .toThrowError('Ціна має бути більше 0');
    });
});