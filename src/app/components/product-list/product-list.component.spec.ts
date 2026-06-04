import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../service/product/product.service';
import { CategoryService } from '../../service/category/category.service';
import { Database } from '@angular/fire/database';
import { signal } from '@angular/core';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    beforeEach(async () => {
        const productServiceMock = {
            products: signal([]),
            filteredProducts$: of([]),
            load: () => {},
            addProduct: () => Promise.resolve(),
            updateProduct: () => Promise.resolve(),
            deleteProduct: () => Promise.resolve(),
            setCategories: () => {},
            setPriceRange: () => {},
            getByCategory: () => []
        };

        const categoryServiceMock = {
            categories: signal([]),
            load: () => {},
            getCategoryNames: () => ['Молочні продукти', 'Овочі', 'Напої']
        };

        await TestBed.configureTestingModule({
            imports: [ProductListComponent],
            providers: [
                { provide: ProductService, useValue: productServiceMock },
                { provide: CategoryService, useValue: categoryServiceMock },
                { provide: Database, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('має ініціалізувати selectedCategories з усіма категоріями', () => {
        expect(component.selectedCategories.length).toBeGreaterThan(0);
    });

    it('onCategoryToggle має додавати категорію', () => {
        component.selectedCategories = [];
        component.onCategoryToggle('Овочі', true);
        expect(component.selectedCategories).toContain('Овочі');
    });

    it('onCategoryToggle має видаляти категорію', () => {
        component.selectedCategories = ['Овочі', 'Напої'];
        component.onCategoryToggle('Овочі', false);
        expect(component.selectedCategories).not.toContain('Овочі');
        expect(component.selectedCategories).toContain('Напої');
    });

    it('onMinPriceChange має встановлювати помилку для від\'ємної ціни', () => {
        component.onMinPriceChange('-5');
        expect(component.minPriceError).toBe('Ціна має бути не менше 0 грн');
    });

    it('onMaxPriceChange має встановлювати помилку для від\'ємної ціни', () => {
        component.onMaxPriceChange('-10');
        expect(component.maxPriceError).toBe('Ціна має бути не менше 0 грн');
    });

    it('onMinPriceChange має очищувати помилку для валідної ціни', () => {
        component.onMinPriceChange('-5');
        expect(component.minPriceError).not.toBe('');
        component.onMinPriceChange('10');
        expect(component.minPriceError).toBe('');
    });

    it('onMaxPriceChange має очищувати помилку для валідної ціни', () => {
        component.onMaxPriceChange('-1');
        expect(component.maxPriceError).not.toBe('');
        component.onMaxPriceChange('100');
        expect(component.maxPriceError).toBe('');
    });

    it('має показувати помилку якщо ціна від більша за ціну до', () => {
        component.onMaxPriceChange('50');
        component.onMinPriceChange('100');
        expect(component.priceRangeError).toBe('Ціна "від" має бути меншою за ціну "до"');
    });

    it('startEdit має встановлювати editingIndex', () => {
        component.startEdit(2);
        expect(component.editingIndex).toBe(2);
    });

    it('cancelEdit має скидати editingIndex', () => {
        component.startEdit(1);
        component.cancelEdit();
        expect(component.editingIndex).toBeNull();
    });
});