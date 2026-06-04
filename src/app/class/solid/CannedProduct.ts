import { Product } from './Product';

export class CannedProduct extends Product {
    constructor(name: string, price: number, public packaging: string) {
        super(name, price, 'Консерви');
    }

    override displayInfo(): string {
        return `${super.displayInfo()}, пакування: ${this.packaging}`;
    }
}