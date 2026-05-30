import { DairyProduct } from './DairyProduct';

describe('DairyProduct testing', () => {
    let dairy: DairyProduct;

    beforeEach(() => {
        dairy = new DairyProduct('Сир', 120, 9);
    });

    it('має створюватись з правильними значеннями', () => {
        expect(dairy).toBeTruthy();
        expect(dairy.name).toBe('Сир');
        expect(dairy.price).toBe(120);
        expect(dairy.fatContent).toBe(9);
        expect(dairy.category).toBe('Молочні продукти');
    });

    it('displayInfo() має містити категорію, назву і жирність', () => {
        expect(dairy.displayInfo()).toContain('Молочні продукти');
        expect(dairy.displayInfo()).toContain('Сир');
        expect(dairy.displayInfo()).toContain('9');
    });
});