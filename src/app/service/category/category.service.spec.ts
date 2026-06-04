import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { Database } from '@angular/fire/database';

describe('CategoryService testing', () => {
    let service: CategoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CategoryService,
                { provide: Database, useValue: {} }
            ]
        });
        service = TestBed.inject(CategoryService);
    });

    it('має створюватись', () => {
        expect(service).toBeTruthy();
    });

    it('має повертати порожній масив категорій на початку', () => {
        expect(service.categories().length).toBe(0);
    });

    it('getCategoryNames має повертати порожній масив якщо немає категорій', () => {
        expect(service.getCategoryNames().length).toBe(0);
    });

    it('getCategoryNames має повертати масив назв після встановлення категорій', () => {
        service.categories.set([
            { id: 'c001', name: 'Молочні продукти' },
            { id: 'c002', name: 'Овочі' },
            { id: 'c003', name: 'Напої' }
        ]);

        const names = service.getCategoryNames();
        expect(names.length).toBe(3);
        expect(names).toContain('Молочні продукти');
        expect(names).toContain('Овочі');
        expect(names).toContain('Напої');
    });
});