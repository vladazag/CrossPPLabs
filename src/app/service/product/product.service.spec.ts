import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { DairyProduct } from '../../class/solid/DairyProduct';
import { Vegetable } from '../../class/solid/Vegetable';
import { Beverage } from '../../class/solid/Beverage';
import { CannedProduct } from '../../class/solid/CannedProduct';
import { firstValueFrom } from 'rxjs';

describe('ProductService testing', () => {
    let service: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductService);

        service.products.set([
            new DairyProduct('Молоко', 45, 2.5),
            new Vegetable('Морква', 18, 'Україна'),
            new Beverage('Сік', 65, 1),
            new CannedProduct('Горошок', 35, 'Жестяна банка'),
            new DairyProduct('Сир', 120, 9)
        ]);
    });

    it('має створюватись', () => {
        expect(service).toBeTruthy();
    });

    it('має додавати продукт', () => {
        const newProduct = new Vegetable('Помідор', 25, 'Україна');
        service.addProduct(newProduct);
        expect(service.products().length).toBe(6);
        expect(service.products()[5].name).toBe('Помідор');
    });

    it('має оновлювати продукт', () => {
        const updated = new DairyProduct('Кефір', 38, 1.0);
        service.updateProduct(0, updated);
        expect(service.products()[0].name).toBe('Кефір');
        expect(service.products()[0].price).toBe(38);
    });

    it('має видаляти продукт', () => {
        service.deleteProduct(1);
        expect(service.products().length).toBe(4);
        expect(service.products().find(p => p.name === 'Морква')).toBeUndefined();
    });

    it('має фільтрувати за однією категорією', async () => {
        service.setCategories(['Молочні продукти']);
        service.setPriceRange(0, Infinity);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(2);
        expect(result.every(p => p.category === 'Молочні продукти')).toBeTrue();
    });

    it('має фільтрувати за кількома категоріями', async () => {
        service.setCategories(['Молочні продукти', 'Овочі']);
        service.setPriceRange(0, Infinity);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(3);
        expect(result.some(p => p.category === 'Молочні продукти')).toBeTrue();
        expect(result.some(p => p.category === 'Овочі')).toBeTrue();
    });

    it('має повертати порожній масив якщо жодна категорія не обрана', async () => {
        service.setCategories([]);
        service.setPriceRange(0, Infinity);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(0);
    });

    it('має фільтрувати за ціною від і до', async () => {
        service.setCategories(['Молочні продукти', 'Овочі', 'Напої', 'Консерви']);
        service.setPriceRange(30, 70);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.every(p => p.price >= 30 && p.price <= 70)).toBeTrue();
        expect(result.some(p => p.name === 'Молоко')).toBeTrue();
        expect(result.some(p => p.name === 'Горошок')).toBeTrue();
        expect(result.some(p => p.name === 'Сік')).toBeTrue();
        expect(result.some(p => p.name === 'Морква')).toBeFalse();
    });

    it('має фільтрувати за ціною від (без верхньої межі)', async () => {
        service.setCategories(['Молочні продукти', 'Овочі', 'Напої', 'Консерви']);
        service.setPriceRange(50, Infinity);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.every(p => p.price >= 50)).toBeTrue();
        expect(result.some(p => p.name === 'Сік')).toBeTrue();
        expect(result.some(p => p.name === 'Сир')).toBeTrue();
    });

    it('має фільтрувати одночасно за категоріями і ціною', async () => {
        service.setCategories(['Молочні продукти']);
        service.setPriceRange(100, Infinity);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Сир');
    });

    it('getByCategory має повертати продукти певної категорії', () => {
        const dairy = service.getByCategory('Молочні продукти');
        expect(dairy.length).toBe(2);
        expect(dairy.every(p => p.category === 'Молочні продукти')).toBeTrue();
    });
});