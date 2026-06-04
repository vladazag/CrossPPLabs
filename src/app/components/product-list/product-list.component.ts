import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonCheckbox, IonInput } from '@ionic/angular/standalone';
import { ProductService } from '../../service/product/product.service';
import { Product } from '../../class/solid/Product';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, AsyncPipe, FormsModule, AddProductComponent, EditProductComponent, IonCheckbox, IonInput]
})
export class ProductListComponent implements OnInit {
  // lab 6
  // products: Product[] = [];

  // constructor(private productService: ProductService) {}

  // async ngOnInit() {
  //   this.products = await this.productService.load();
  // }

  // buy(product: Product) {
  //   alert(`Ви купили: ${product.name}`);
  // }
  
  editingIndex: number | null = null;

  constructor(public productService: ProductService) {}

  async ngOnInit() {
    await this.productService.load();
    // lab 8
    this.productService.setCategories(this.selectedCategories);
  }

  // lab 7
  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

  startEdit(index: number) {
    this.editingIndex = index;
  }

  saveEdit(event: { index: number, product: Product }) {
    this.productService.updateProduct(event.index, event.product);
    this.editingIndex = null;
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteProduct(index: number) {
    this.productService.deleteProduct(index);
  }

  // lab 8
  allCategories = ['Молочні продукти', 'Овочі', 'Напої', 'З терміном придатності', 'Консерви', 'Органічні продукти'];
  selectedCategories: string[] = [...this.allCategories];
  filteredProducts = toSignal(this.productService.filteredProducts$, { initialValue: [] });

  minPriceInput: string = '';
  maxPriceInput: string = '';
  minPriceError: string = '';
  maxPriceError: string = '';
  priceRangeError: string = '';
  noResultsMessage: string = '';

  onCategoryToggle(category: string, checked: boolean) {
      if (checked) {
          this.selectedCategories = [...this.selectedCategories, category];
      } else {
          this.selectedCategories = this.selectedCategories.filter(c => c !== category);
      }
      this.productService.setCategories(this.selectedCategories);
      this.checkNoResults();
  }

  onMinPriceChange(value: string) {
      this.minPriceInput = value;
      this.minPriceError = '';

      if (value === '') {
          this.productService.setPriceRange(0, this.parseMax());
          this.checkNoResults();
          return;
      }

      const num = Number(value);
      if (num < 0) {
          this.minPriceError = 'Ціна має бути не менше 0 грн';
          return;
      }

      this.productService.setPriceRange(num, this.parseMax());
      this.validatePriceRange();
      this.checkNoResults();
  }

  onMaxPriceChange(value: string) {
      this.maxPriceInput = value;
      this.maxPriceError = '';

      if (value === '') {
          this.productService.setPriceRange(this.parseMin(), Infinity);
          this.checkNoResults();
          return;
      }

      const num = Number(value);
      if (num < 0) {
          this.maxPriceError = 'Ціна має бути не менше 0 грн';
          return;
      }

      this.productService.setPriceRange(this.parseMin(), num);
      this.validatePriceRange();
      this.checkNoResults();
  }

  private parseMin(): number {
      const num = Number(this.minPriceInput);
      return (this.minPriceInput === '' || isNaN(num) || num < 0) ? 0 : num;
  }

  private parseMax(): number {
      const num = Number(this.maxPriceInput);
      return (this.maxPriceInput === '' || isNaN(num) || num < 0) ? Infinity : num;
  }

  private validatePriceRange() {
    const min = this.parseMin();
    const max = this.parseMax();

    if (this.maxPriceInput !== '' && min > max) {
        this.priceRangeError = 'Ціна "від" має бути меншою за ціну "до"';
    } else {
        this.priceRangeError = '';
    }
  }

  private checkNoResults() {
      setTimeout(() => {
          this.noResultsMessage = this.filteredProducts().length === 0 ? 'Не знайдено' : '';
      });
  }
}