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
});
