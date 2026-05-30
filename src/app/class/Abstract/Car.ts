import { Vehicle } from './Vehicle'

type Transmission = 'механіка' | 'автомат';

export class Car extends Vehicle {
    constructor(maxSpeed: number, range: number, public fuelType: string, public transmission: Transmission) {
        if (transmission !== 'механіка' && transmission !== 'автомат') {
            throw new Error(`Невалідна коробка передач: "${transmission}"`);
        }
        super("Автомобіль", maxSpeed, range);
    }

    drive() {
        return("Автомобіль починає рух");
    }
}

