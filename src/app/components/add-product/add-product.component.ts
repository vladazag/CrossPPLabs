import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ProductFormFactory } from '../../class/solid/ProductFormFactory';
import { ProductFactory } from '../../class/solid/ProductFactory';
import { Product } from '../../class/solid/Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, FormsModule]
})
export class AddProductComponent {
  onAdd = output<Product>();

  categories = ['Молочні продукти', 'Овочі', 'Напої', 'З терміном придатності'];
  selectedCategory = 'Молочні продукти';
  form: FormGroup = ProductFormFactory.createForm(this.selectedCategory);

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.form = ProductFormFactory.createForm(category);
  }

  submit() {
    if (this.form.invalid) return;

    const data = { ...this.form.value, category: this.selectedCategory };
    const product = ProductFactory.getProduct(data);
    this.onAdd.emit(product);
    this.form.reset();
  }
}