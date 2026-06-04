import { Product } from './Product';
import { DairyProduct } from './DairyProduct';
import { Vegetable } from './Vegetable';
import { Beverage } from './Beverage';
import { PerishableProduct } from './PerishableProduct';
import { CannedProduct } from './CannedProduct';
import { OrganicProduct } from './OrganicProduct';

export class ProductFactory {
    public static getProduct(data: any, id: string = ''): Product {
        let product: Product;
        switch (data.category) {
            case 'Молочні продукти':
                product = new DairyProduct(data.name, data.price, data.fatContent);
                break;
            case 'Овочі':
                product = new Vegetable(data.name, data.price, data.origin);
                break;
            case 'Напої':
                product = new Beverage(data.name, data.price, data.volume);
                break;
            case 'З терміном придатності':
                product = new PerishableProduct(data.name, data.price, data.category, data.expiryDate);
                break;
            case 'Консерви':
                product = new CannedProduct(data.name, data.price, data.packaging);
                break;
            case 'Органічні продукти':
                product = new OrganicProduct(data.name, data.price, data.certificate);
                break;
            default:
                throw new Error('Невідома категорія: ' + data.category);
        }
        product.id = id;
        return product;
    }
}