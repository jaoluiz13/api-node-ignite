import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarRepository } from "../../../repositories/ICarRepository";
import { Car } from "../entities/Car";

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }
    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }
    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne({ id: car_id });
    return car;
  }
}

export { CarRepository };
