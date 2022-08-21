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
    const car = await carsRepositoryInMemory.create({
      name: "car test",
      description: "tetsing",
      brand: "vw",
      fine_amount: 0,
      license_plate: "ABCDE-1234",
      daily_rate: 0,
      category_id: "48dadeaf-f4f2-4233-9547-b760b352624f",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should be not able to rental to a user that already have one rental", async () => {
    await rentalRepositoryInMemory.createRental({
      car_id: "1234",
      expected_return_date: dayAdd24Hours,
      user_id: "12348658789",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress to user"));
  });

  it("Should be not able to rental a car if that already have one rental", async () => {
    await rentalRepositoryInMemory.createRental({
      car_id: "1234",
      expected_return_date: dayAdd24Hours,
      user_id: "12348658789",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("Should be not able to rental a car if the return date is less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123456",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
