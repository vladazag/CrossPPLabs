import { Product } from './Product';
import { DairyProduct } from './DairyProduct';
import { Vegetable } from './Vegetable';
import { Beverage } from './Beverage';
import { PerishableProduct } from './PerishableProduct';

export class ProductFactory {
    public static getProduct(data: any): Product {
        switch (data.category) {
            case 'Молочні продукти':
                return new DairyProduct(data.name, data.price, data.fatContent);
            case 'Овочі':
                return new Vegetable(data.name, data.price, data.origin);
            case 'Напої':
                return new Beverage(data.name, data.price, data.volume);
            case 'З терміном придатності':
                return new PerishableProduct(data.name, data.price, data.category, data.expiryDate);
            default:
                throw new Error('Невідома категорія: ' + data.category);
        }
    }
}