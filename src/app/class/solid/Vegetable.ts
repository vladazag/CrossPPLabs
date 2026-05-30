import { Product } from './Product';

export class Vegetable extends Product {
    constructor(name: string, price: number, public origin: string) {
        super(name, price, 'Овочі');
    }

    override displayInfo(): string {
        return `${super.displayInfo()}, походження: ${this.origin}`;
    }
}