import { Product } from './Product';
import { DairyProduct } from './DairyProduct';
import { Vegetable } from './Vegetable';
import { Beverage } from './Beverage';
import { PerishableProduct } from './PerishableProduct';
import { CannedProduct } from './CannedProduct';
import { OrganicProduct } from './OrganicProduct';

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
            case 'Консерви':
            return new CannedProduct(data.name, data.price, data.packaging);
            case 'Органічні продукти':
                return new OrganicProduct(data.name, data.price, data.certificate);
            default:
                throw new Error('Невідома категорія: ' + data.category);
        }
    }
}