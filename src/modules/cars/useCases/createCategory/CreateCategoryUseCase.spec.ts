import { AppError } from "../../../../shared/errors/AppErrors";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCateory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCateory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Testing create category",
    };
    await createCateory.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category with same name", async () => {
    const category = {
      name: "Category test",
      description: "Testing create category",
    };

    await createCateory.execute({
      name: category.name,
      description: category.description,
    });

    await expect(async () => {
      await createCateory.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toEqual(new AppError("Category already exists"));
  });
});
