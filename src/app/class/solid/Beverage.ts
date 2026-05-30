import { Product } from './Product';

export class Beverage extends Product {
    constructor(name: string, price: number, public volume: number) {
        super(name, price, 'Напої');
    }

    override displayInfo(): string {
        return `${super.displayInfo()}, об'єм: ${this.volume}л`;
    }
}