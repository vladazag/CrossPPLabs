import { Injectable, signal } from '@angular/core';
import { Product } from '../../class/solid/Product';
import { ProductFactory } from '../../class/solid/ProductFactory';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    //private products: Product[] = []; // lab6 
    products = signal<Product[]>([]);
    private dataUrl = 'https://api.jsonbin.io/v3/b/6a1b2a52ddf5aa59f7791f6e'; 
    
    //lab 6
    // async load(): Promise<Product[]> {
    //     const res = await fetch(this.dataUrl);
    //     const json = await res.json();
    //     this.products = json.record.products.map(
    //         (item: any) => ProductFactory.getProduct(item)
    //     );
    //     return this.products;
    // }

    // getByCategory(category: string): Product[] {
    //     return this.products.filter(p => p.category === category);
    // }
  
  async load(): Promise<void> {
      const res = await fetch(this.dataUrl);
      const json = await res.json();
      const loaded = json.record.products.map(
          (item: any) => ProductFactory.getProduct(item)
      );
      this.products.set(loaded);
  }

  addProduct(product: Product): void {
      this.products.update((list: Product[]) => [...list, product]);
  }

  updateProduct(index: number, product: Product): void {
      this.products.update((list: Product[]) => {
          const updated = [...list];
          updated[index] = product;
          return updated;
      });
  }

  deleteProduct(index: number): void {
      this.products.update((list: Product[]) => list.filter((_: Product, i: number) => i !== index));
  }

  getByCategory(category: string): Product[] {
      return this.products().filter((p: Product) => p.category === category);
  }
}