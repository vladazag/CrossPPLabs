import { IProduct } from './IProduct';
import { IDisplayable } from './IDisplayable';

export abstract class Product implements IProduct, IDisplayable {
    constructor(
        public name: string,
        public price: number,
        public category: string
    ) {
        if (price <= 0) throw new Error('Ціна має бути більше 0');
    }

    getInfo(): string {
        return `${this.name}, ціна: ${this.price} грн`;
    }

    displayInfo(): string {
        return `[${this.category}] ${this.getInfo()}`;
    }
}