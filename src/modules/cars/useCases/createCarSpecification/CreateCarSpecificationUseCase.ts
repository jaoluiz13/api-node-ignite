import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppErrors";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarRepository } from "../../repositories/ICarRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car doest exists");
    }

    const specifcationExists = await this.specificationRepository.findByIds(
      specifications_id
    );
    carExists.specifications = specifcationExists;
    await this.carRepository.create(carExists);

    return carExists;
  }
}
export { CreateCarSpecificationUseCase };
