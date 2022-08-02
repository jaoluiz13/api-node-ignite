import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const findCategory = await this.categoriesRepository.findByName(name);
    if (findCategory) {
      throw new Error("Category already exists");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
