import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { ProductService } from '../../service/product/product.service';
import { CategoryService } from '../../service/category/category.service';
import { Database } from '@angular/fire/database';
import { signal } from '@angular/core';

describe('AddProductComponent', () => {
    let component: AddProductComponent;
    let fixture: ComponentFixture<AddProductComponent>;

    beforeEach(async () => {
        const productServiceMock = {
            products: signal([]),
            load: () => {},
            addProduct: () => Promise.resolve()
        };

        const categoryServiceMock = {
            categories: signal([
                { id: 'c001', name: 'Молочні продукти' },
                { id: 'c002', name: 'Овочі' }
            ]),
            load: () => {},
            getCategoryNames: () => ['Молочні продукти', 'Овочі']
        };

        await TestBed.configureTestingModule({
            imports: [AddProductComponent],
            providers: [
                { provide: ProductService, useValue: productServiceMock },
                { provide: CategoryService, useValue: categoryServiceMock },
                { provide: Database, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('має мати форму з полями name і price', () => {
        expect(component.form.contains('name')).toBeTrue();
        expect(component.form.contains('price')).toBeTrue();
    });

    it('onCategoryChange має змінювати selectedCategory', () => {
        component.onCategoryChange('Овочі');
        expect(component.selectedCategory).toBe('Овочі');
    });

    it('submit не має спрацьовувати якщо форма невалідна', () => {
        component.form.controls['name'].setValue('');
        component.submit();
        expect(component.form.invalid).toBeTrue();
    });
});