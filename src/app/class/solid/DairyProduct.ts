import { Product } from './Product';

export class DairyProduct extends Product {
    constructor(name: string, price: number, public fatContent: number) {
        super(name, price, 'Молочні продукти');
    }

    override displayInfo(): string {
        return `${super.displayInfo()}, жирність: ${this.fatContent}%`;
    }
}