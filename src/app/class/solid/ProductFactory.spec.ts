import { ProductFactory } from './ProductFactory';
import { DairyProduct } from './DairyProduct';
import { Vegetable } from './Vegetable';
import { Beverage } from './Beverage';
import { PerishableProduct } from './PerishableProduct';
import { CannedProduct } from './CannedProduct';
import { OrganicProduct } from './OrganicProduct';

describe('ProductFactory testing', () => {
    it('має створювати DairyProduct', () => {
        const product = ProductFactory.getProduct({
        category: 'Молочні продукти', name: 'Молоко', price: 45, fatContent: 2.5
        });
        expect(product instanceof DairyProduct).toBeTrue();
    });

    it('має створювати Vegetable', () => {
        const product = ProductFactory.getProduct({
        category: 'Овочі', name: 'Морква', price: 18, origin: 'Україна'
        });
        expect(product instanceof Vegetable).toBeTrue();
    });

    it('має створювати Beverage', () => {
        const product = ProductFactory.getProduct({
        category: 'Напої', name: 'Сік', price: 65, volume: 1
        });
        expect(product instanceof Beverage).toBeTrue();
    });

    it('має створювати PerishableProduct', () => {
        const product = ProductFactory.getProduct({
        category: 'З терміном придатності', name: 'Йогурт', price: 35, expiryDate: '2099-01-01'
        });
        expect(product instanceof PerishableProduct).toBeTrue();
    });

    it('має викидати помилку для невідомої категорії', () => {
        expect(() => ProductFactory.getProduct({ category: 'Невідома', name: 'Щось', price: 10 }))
        .toThrowError('Невідома категорія: Невідома');
    });

    it('має створювати CannedProduct', () => {
        const product = ProductFactory.getProduct({
            category: 'Консерви', name: 'Горошок', price: 35, packaging: 'Жестяна банка'
        });
        expect(product instanceof CannedProduct).toBeTrue();
    });

    it('має створювати OrganicProduct', () => {
        const product = ProductFactory.getProduct({
            category: 'Органічні продукти', name: 'Органічне молоко', price: 85, certificate: 'UA-ORG-2024'
        });
        expect(product instanceof OrganicProduct).toBeTrue();
    });

    it('має присвоювати id при створенні', () => {
        const product = ProductFactory.getProduct({
            category: 'Овочі', name: 'Морква', price: 18, origin: 'Україна'
        }, 'test-id');
        expect(product.id).toBe('test-id');
    });
});