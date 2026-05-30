import { Product } from './Product';
import { IExpirable } from './IExpirable';

export class PerishableProduct extends Product implements IExpirable {
    constructor(
        name: string,
        price: number,
        category: string,
        public expiryDate: string
    ) {
        super(name, price, category);
    }

    isExpired(): boolean {
        return new Date(this.expiryDate) < new Date();
    }

    override displayInfo(): string {
        const status = this.isExpired() ? 'Прострочено' : 'Придатний';
        return `${super.displayInfo()}, термін придатності: ${this.expiryDate} ${status}`;
    }
}