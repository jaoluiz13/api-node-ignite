import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ICarRepository } from "../../../cars/repositories/ICarRepository";
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalRepository.findById(id);
    const minimumDaily = 1;
    const car = await this.carRepository.findById(rental.car_id);
    if (!rental) {
      throw new AppError("Rental not found");
    }
    console.log(car);
    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
    if (daily <= 0) {
      daily = minimumDaily;
    }
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );
    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }
    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalRepository.createRental(rental);
    await this.carRepository.updateAvailabe(car.id, true);

    return rental;
  }
}
export { DevolutionRentalUseCase };
