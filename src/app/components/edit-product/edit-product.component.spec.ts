import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { DairyProduct } from '../../class/solid/DairyProduct';

describe('EditProductComponent', () => {
    let component: EditProductComponent;
    let fixture: ComponentFixture<EditProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditProductComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(EditProductComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('product', new DairyProduct('Молоко', 45, 2.5));
        fixture.componentRef.setInput('index', 0);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('має ініціалізувати форму зі значеннями продукту', () => {
        expect(component.form.get('name')?.value).toBe('Молоко');
        expect(component.form.get('price')?.value).toBe(45);
    });

    it('має мати поле fatContent для молочного продукту', () => {
        expect(component.form.contains('fatContent')).toBeTrue();
        expect(component.form.get('fatContent')?.value).toBe(2.5);
    });

    it('cancel має емітити onCancel', () => {
        spyOn(component.onCancel, 'emit');
        component.cancel();
        expect(component.onCancel.emit).toHaveBeenCalled();
    });
});