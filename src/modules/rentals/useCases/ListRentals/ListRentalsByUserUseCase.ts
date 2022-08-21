import { inject } from "tsyringe";

import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository";

class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalRepository.findByUser(user_id);
    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
