import { Product } from './Product';

export class OrganicProduct extends Product {
    constructor(name: string, price: number, public certificate: string) {
        super(name, price, 'Органічні продукти');
    }

    override displayInfo(): string {
        return `${super.displayInfo()}, сертифікат: ${this.certificate}`;
    }
}