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

    // передаємо обов'язкові inputs
    fixture.componentRef.setInput('product', new DairyProduct('Молоко', 45, 2.5));
    fixture.componentRef.setInput('index', 0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});