import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarRepository } from "../ICarRepository";

class CarsRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): void {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };
