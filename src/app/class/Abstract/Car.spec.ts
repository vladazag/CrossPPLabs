import { Car } from './Car';

describe('Car testing', () => {
    let car: Car;

    beforeEach(() => {
        car = new Car(187, 620, 'Бензин', 'автомат');
    });

    it('має створюватись з правильними значеннями', () => {
        expect(car).toBeTruthy();
        expect(car.getType()).toBe('Автомобіль');
        expect(car.getRange()).toBe(620);
        expect(car.fuelType).toBe('Бензин');
    });

    it('drive() має повертати визначений рядок', () => {
        expect(car.drive()).toBe('Автомобіль починає рух');
    });

    it('displayInfo() має повертати інформацію про автомобіль', () => {
        expect(car.displayInfo()).toContain('Автомобіль');
        expect(car.displayInfo()).toContain('187');
        expect(car.displayInfo()).toContain('620');
    });
});

it('приймає значення "механіка"', () => {
    const car = new Car(180, 600, 'бензин', 'механіка');
    expect(car.transmission).toBe('механіка');
});

it('приймає значення "автомат"', () => {
    const car = new Car(200, 700, 'дизель', 'автомат');
    expect(car.transmission).toBe('автомат');
});

it('кидає помилку при невалідному значенні коробки передач', () => {
    const invalidValue = 'варіатор' as any;
    expect(() => new Car(150, 500, 'електро', invalidValue))
        .toThrowError('Невалідна коробка передач: "варіатор"');
});