import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ProductService } from '../../service/product/product.service';
import { Product } from '../../class/solid/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.products = await this.productService.load();
  }

  buy(product: Product) {
    alert(`Ви купили: ${product.name}`);
  }
}