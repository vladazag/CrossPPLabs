import { Vehicle } from "./Vehicle";
import { Car } from "./Car";
import { Bicycle } from "./Bicycle";
import { Motorcycle } from './Motorcycle';
import { VehicleNameMap } from "./VehicleName";

export class VehicleFactory {
    public static getVehicle(data: any): Vehicle {
        if (data.type === VehicleNameMap['Car']) 
            return new Car(data.maxSpeed, data.range, data.fuelType, data.Transmission);
        else if (data.type === VehicleNameMap['Bicycle']) 
            return new Bicycle(data.maxSpeed, data.range, data.gearCount);
        else if (data.type === VehicleNameMap['Motorcycle']) 
            return new Motorcycle(data.maxSpeed, data.range);
        else 
            throw new Error('Невідомий вид транспорту');
    }
}
