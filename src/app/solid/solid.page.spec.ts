import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolidPage } from './solid.page';
import { AuthService } from '../service/auth/auth.service';
import { ProductService } from '../service/product/product.service';
import { CategoryService } from '../service/category/category.service';
import { Database } from '@angular/fire/database';
import { signal } from '@angular/core';

describe('SolidPage', () => {
    let component: SolidPage;
    let fixture: ComponentFixture<SolidPage>;

    beforeEach(async () => {
        const authServiceMock = {
            isLoggedIn: signal(false),
            currentUser: signal(null),
            login: () => Promise.resolve(),
            register: () => Promise.resolve(),
            logout: () => Promise.resolve()
        };

        const productServiceMock = {
            products: signal([]),
            filteredProducts$: { pipe: () => ({ subscribe: () => {} }) },
            load: () => {},
            addProduct: () => Promise.resolve(),
            updateProduct: () => Promise.resolve(),
            deleteProduct: () => Promise.resolve(),
            deleteProductsByCategory: () => Promise.resolve(),
            setCategories: () => {},
            setPriceRange: () => {},
            getByCategory: () => []
        };

        const categoryServiceMock = {
            categories: signal([]),
            load: () => {},
            getCategoryNames: () => [],
            addCategory: () => Promise.resolve(),
            updateCategory: () => Promise.resolve(),
            deleteCategory: () => Promise.resolve()
        };

        await TestBed.configureTestingModule({
            imports: [SolidPage],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: ProductService, useValue: productServiceMock },
                { provide: CategoryService, useValue: categoryServiceMock },
                { provide: Database, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SolidPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});