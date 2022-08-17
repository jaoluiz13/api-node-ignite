import { inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppErrors";
import { ICarRepository } from "../../repositories/ICarRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carRepository: ICarRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carRepository.findById(car_id);
    if (!carExists) {
      throw new AppError("Car doest exists");
    }
  }
}
export { CreateCarSpecificationUseCase };
