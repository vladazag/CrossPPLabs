import { Component, input, output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { ProductFormFactory } from '../../class/solid/ProductFormFactory';
import { ProductFactory } from '../../class/solid/ProductFactory';
import { Product } from '../../class/solid/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton]
})
export class EditProductComponent implements OnInit {
  product = input.required<Product>();
  index = input.required<number>();
  onSave = output<{ index: number, product: Product }>();
  onCancel = output<void>();

  form!: FormGroup;

  ngOnInit() {
    this.form = ProductFormFactory.createForm(this.product().category);
    this.form.patchValue(this.product());
  }

  submit() {
    if (this.form.invalid) return;
    const data = { ...this.form.value, category: this.product().category };
    const updated = ProductFactory.getProduct(data);
    this.onSave.emit({ index: this.index(), product: updated });
  }

  cancel() {
    this.onCancel.emit();
  }
}