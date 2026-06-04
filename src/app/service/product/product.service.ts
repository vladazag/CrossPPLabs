import { Injectable, signal } from '@angular/core';
import { Product } from '../../class/solid/Product';
import { ProductFactory } from '../../class/solid/ProductFactory';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
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
    
    // lab7
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

    // lab 8
    private categoriesSubject = new BehaviorSubject<string[]>([]);
    categories$ = this.categoriesSubject.asObservable();

    private minPriceSubject = new BehaviorSubject<number>(0);
    private maxPriceSubject = new BehaviorSubject<number>(Infinity);
    minPrice$ = this.minPriceSubject.asObservable();
    maxPrice$ = this.maxPriceSubject.asObservable();

    filteredProducts$ = combineLatest([
        toObservable(this.products),
        this.categories$,
        this.minPrice$,
        this.maxPrice$
    ]).pipe(
        map(([products, categories, minPrice, maxPrice]: [Product[], string[], number, number]) => {
            let result = products;

            result = result.filter((p: Product) => categories.includes(p.category));
            result = result.filter((p: Product) => p.price >= minPrice && p.price <= maxPrice);

            return result;
        })
    );

    setCategories(categories: string[]): void {
        this.categoriesSubject.next(categories);
    }

    setPriceRange(min: number, max: number): void {
        this.minPriceSubject.next(min);
        this.maxPriceSubject.next(max);
    }
}