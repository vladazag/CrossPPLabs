import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryManagerComponent } from './category-manager.component';
import { CategoryService } from '../../service/category/category.service';
import { ProductService } from '../../service/product/product.service';
import { Database } from '@angular/fire/database';
import { signal } from '@angular/core';
import { of } from 'rxjs';

describe('CategoryManagerComponent', () => {
    let component: CategoryManagerComponent;
    let fixture: ComponentFixture<CategoryManagerComponent>;

    beforeEach(async () => {
        const categoryServiceMock = {
            categories: signal([
                { id: 'c001', name: 'Молочні продукти' },
                { id: 'c002', name: 'Овочі' }
            ]),
            load: () => {},
            getCategoryNames: () => ['Молочні продукти', 'Овочі'],
            addCategory: () => Promise.resolve(),
            updateCategory: () => Promise.resolve(),
            deleteCategory: () => Promise.resolve()
        };

        const productServiceMock = {
            products: signal([]),
            filteredProducts$: of([]),
            load: () => {},
            deleteProductsByCategory: () => Promise.resolve()
        };

        await TestBed.configureTestingModule({
            imports: [CategoryManagerComponent],
            providers: [
                { provide: CategoryService, useValue: categoryServiceMock },
                { provide: ProductService, useValue: productServiceMock },
                { provide: Database, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('має показувати помилку якщо назва категорії порожня', async () => {
        component.newCategoryName = '';
        await component.addCategory();
        expect(component.error).toBe('Назва категорії не може бути порожньою');
    });

    it('має очищувати назву після додавання категорії', async () => {
        component.newCategoryName = 'Нова категорія';
        await component.addCategory();
        expect(component.newCategoryName).toBe('');
        expect(component.error).toBe('');
    });

    it('startEdit має встановлювати editingId та editingName', () => {
        component.startEdit({ id: 'c001', name: 'Молочні продукти' });
        expect(component.editingId).toBe('c001');
        expect(component.editingName).toBe('Молочні продукти');
    });

    it('cancelEdit має скидати editingId', () => {
        component.startEdit({ id: 'c001', name: 'Молочні продукти' });
        component.cancelEdit();
        expect(component.editingId).toBeNull();
        expect(component.editingName).toBe('');
    });

    it('saveEdit має показувати помилку якщо назва порожня', async () => {
        component.editingName = '   ';
        await component.saveEdit('c001');
        expect(component.error).toBe('Назва категорії не може бути порожньою');
    });

    it('saveEdit має скидати editingId після збереження', async () => {
        component.editingId = 'c001';
        component.editingName = 'Нова назва';
        await component.saveEdit('c001');
        expect(component.editingId).toBeNull();
    });
});