import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should be able to add a new specification to a non-existing car", () =>
    async () => {
      expect(async () => {
        const car_id = "68ec481d-2cda-4857-92dc-b91f5e0f9bba";
        const specifications_id = ["5a8d319e-a1c0-4cea-a968-41c2f1c03ab7"];

        await createCarSpecificationUseCase.execute({
          car_id,
          specifications_id,
        });
      });
    });

  it("Should be able to add a new specification to a  car", () => async () => {
    const car = await carsRepositoryInMemory.create({
      name: "carrinho do admin",
      description: "novo kkkkk",
      brand: "vt",
      license_plate: "ABCDE-12345",
      category_id: "48dadeaf-f4f2-4233-9547-b760b352624f",
      daily_rate: 18.0,
      fine_amount: 100.0,
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "test1",
      description: "testando",
    });
    const specifications_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
