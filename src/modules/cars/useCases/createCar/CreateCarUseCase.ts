import { injectable, inject } from "tsyringe";

import { ICarRepository } from "../../repositories/ICarRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository
  ) {}
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<void> {
    this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
  }
}

export { CreateCarUseCase };
