import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppErrors";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const findCategory = await this.categoriesRepository.findByName(name);
    if (findCategory) {
      throw new AppError("Category already exists");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
