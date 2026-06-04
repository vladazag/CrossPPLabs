import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { DairyProduct } from '../../class/solid/DairyProduct';
import { Vegetable } from '../../class/solid/Vegetable';
import { Beverage } from '../../class/solid/Beverage';
import { CannedProduct } from '../../class/solid/CannedProduct';
import { OrganicProduct } from '../../class/solid/OrganicProduct';
import { firstValueFrom } from 'rxjs';
import { Database } from '@angular/fire/database';

describe('ProductService testing', () => {
    let service: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductService,
                { provide: Database, useValue: {} }
            ]
        });
        service = TestBed.inject(ProductService);

        const products = [
            new DairyProduct('Молоко', 45, 2.5),
            new Vegetable('Морква', 18, 'Україна'),
            new Beverage('Сік', 65, 1),
            new CannedProduct('Горошок', 35, 'Жестяна банка'),
            new DairyProduct('Сир', 120, 9),
            new OrganicProduct('Органічне молоко', 85, 'UA-ORG-2024')
        ];
        products[0].id = 'p001';
        products[1].id = 'p002';
        products[2].id = 'p003';
        products[3].id = 'p004';
        products[4].id = 'p005';
        products[5].id = 'p006';
        service.products.set(products);
    });

    it('має створюватись', () => {
        expect(service).toBeTruthy();
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
        service.setCategories(['Молочні продукти', 'Овочі', 'Напої', 'Консерви', 'Органічні продукти']);
        service.setPriceRange(30, 70);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.every(p => p.price >= 30 && p.price <= 70)).toBeTrue();
        expect(result.some(p => p.name === 'Молоко')).toBeTrue();
        expect(result.some(p => p.name === 'Горошок')).toBeTrue();
        expect(result.some(p => p.name === 'Сік')).toBeTrue();
        expect(result.some(p => p.name === 'Морква')).toBeFalse();
    });

    it('має фільтрувати за ціною від (без верхньої межі)', async () => {
        service.setCategories(['Молочні продукти', 'Овочі', 'Напої', 'Консерви', 'Органічні продукти']);
        service.setPriceRange(50, Infinity);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.every(p => p.price >= 50)).toBeTrue();
        expect(result.some(p => p.name === 'Сік')).toBeTrue();
        expect(result.some(p => p.name === 'Сир')).toBeTrue();
        expect(result.some(p => p.name === 'Органічне молоко')).toBeTrue();
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

    it('getByCategory має повертати порожній масив для неіснуючої категорії', () => {
        const result = service.getByCategory('Неіснуюча');
        expect(result.length).toBe(0);
    });

    it('має фільтрувати за точною ціною (від = до)', async () => {
        service.setCategories(['Молочні продукти', 'Овочі', 'Напої', 'Консерви', 'Органічні продукти']);
        service.setPriceRange(35, 35);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.every(p => p.price === 35)).toBeTrue();
        expect(result.some(p => p.name === 'Горошок')).toBeTrue();
    });

    it('має повертати порожній масив якщо ціновий діапазон не містить продуктів', async () => {
        service.setCategories(['Молочні продукти', 'Овочі', 'Напої', 'Консерви', 'Органічні продукти']);
        service.setPriceRange(500, 1000);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(0);
    });

    it('має фільтрувати органічні продукти', async () => {
        service.setCategories(['Органічні продукти']);
        service.setPriceRange(0, Infinity);

        const result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Органічне молоко');
    });

    it('setCategories має змінювати фільтр категорій', async () => {
        service.setCategories(['Напої']);
        service.setPriceRange(0, Infinity);

        let result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Сік');

        service.setCategories(['Напої', 'Консерви']);
        result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBe(2);
    });

    it('setPriceRange має змінювати фільтр ціни', async () => {
        service.setCategories(['Молочні продукти', 'Овочі', 'Напої', 'Консерви', 'Органічні продукти']);
        service.setPriceRange(0, 20);

        let result = await firstValueFrom(service.filteredProducts$);
        expect(result.every(p => p.price <= 20)).toBeTrue();

        service.setPriceRange(0, 50);
        result = await firstValueFrom(service.filteredProducts$);
        expect(result.length).toBeGreaterThan(1);
    });
});