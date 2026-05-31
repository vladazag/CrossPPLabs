import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ProductService } from '../../service/product/product.service';
import { Product } from '../../class/solid/Product';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, AddProductComponent, EditProductComponent]
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
  }

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
}