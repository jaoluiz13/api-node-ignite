import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

let listCarUseCase: ListAvailableCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  listCarUseCase = new ListAvailableCarUseCase(carsRepositoryInMemory);
});

describe("List Cars", () => {
  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "carrinho do admin",
      description: "novo kkkkk",
      brand: "vt",
      license_plate: "ABCDE-12345",
      category_id: "48dadeaf-f4f2-4233-9547-b760b352624f",
      daily_rate: 18.0,
      fine_amount: 100.0,
    });

    const cars = await listCarUseCase.execute({
      brand: "Car brand",
      category_id: "aaaaaaaa",
      name: "carro",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "carrinho do admin",
      description: "novo kkkkk",
      brand: "vt",
      license_plate: "ABCDE-12345",
      category_id: "48dadeaf-f4f2-4233-9547-b760b352624f",
      daily_rate: 18.0,
      fine_amount: 100.0,
    });

    const cars = await listCarUseCase.execute({
      name: "carrinho do admin",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "carrinho do admin",
      description: "novo kkkkk",
      brand: "vt",
      license_plate: "ABCDE-12345",
      category_id: "48dadeaf-f4f2-4233-9547-b760b352624f",
      daily_rate: 18.0,
      fine_amount: 100.0,
    });

    const cars = await listCarUseCase.execute({
      category_id: "48dadeaf-f4f2-4233-9547-b760b352624f",
    });

    expect(cars).toEqual([car]);
  });
});
