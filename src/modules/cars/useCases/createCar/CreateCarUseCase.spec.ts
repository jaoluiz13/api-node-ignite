import { AppError } from "../../../../shared/errors/AppErrors";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

beforeEach(() => {
  createCarUseCase = new CreateCarUseCase(carsRepository);
});

describe("Create car", () => {
  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "name_test",
      description: "testing",
      daily_rate: 100,
      license_plate: "abcdef",
      fine_amount: 100,
      brand: "vw",
      category_id: "555555aawwwww",
    });
  });
  it("Should be not be able to create a car with a existing license_plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "name_test1",
        description: "testing license_plate 1 ",
        daily_rate: 100,
        license_plate: "abcdef",
        fine_amount: 100,
        brand: "vw",
        category_id: "555555aawwwww",
      });

      await createCarUseCase.execute({
        name: "name_test 2 ",
        description: "testing 2",
        daily_rate: 100,
        license_plate: "abcdef",
        fine_amount: 100,
        brand: "vw",
        category_id: "555555aawwwww",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "name_test  available",
      description: "testing",
      daily_rate: 100,
      license_plate: "abcdefg",
      fine_amount: 100,
      brand: "vw",
      category_id: "555555aawwwww",
    });
    expect(car.available).toBe(true);
  });
});
