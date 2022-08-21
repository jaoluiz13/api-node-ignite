import dayjs from "dayjs";

import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppErrors";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });
  it("Should be able to rental a available car", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "123456",
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should be not able to rental to a user that already have one rental", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      });
    }).toBeInstanceOf(AppError);
  });

  it("Should be not able to rental a car if that already have one rental", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      });
    }).toBeInstanceOf(Error);
  });

  it("Should be not able to rental a car if the return date is less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123456",
        expected_return_date: dayjs().toDate(),
      });
    }).toBeInstanceOf(Error);
  });
});
