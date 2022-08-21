import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ICarRepository } from "../../../cars/repositories/ICarRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const minHourToRental = 24;
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car not available");
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("User already have a open rental");
    }

    //
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minHourToRental) {
      throw new AppError("The minimum hour to rental a car is 24 hours");
    }

    const rental = await this.rentalRepository.createRental({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carRepository.updateAvailabe(car_id, false);

    return rental;
  }
}
export { CreateRentalUseCase };
