import { Injectable } from '@angular/core';
import { Product } from '../../class/solid/Product';
import { ProductFactory } from '../../class/solid/ProductFactory';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [];
    private dataUrl = 'https://api.jsonbin.io/v3/b/6a1b2a52ddf5aa59f7791f6e'; 

    async load(): Promise<Product[]> {
        const res = await fetch(this.dataUrl);
        const json = await res.json();
        this.products = json.record.products.map(
            (item: any) => ProductFactory.getProduct(item)
        );
        return this.products;
    }

    getByCategory(category: string): Product[] {
        return this.products.filter(p => p.category === category);
    }
}