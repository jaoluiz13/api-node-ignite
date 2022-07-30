import { Category } from "../model/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "./ICategoryRepository";

// O DTO (Data Transfer Object) é responsável por fazer a transferencia de dados
// entre uma classe e outra

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }
  public create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }
  public list(): Category[] {
    return this.categories;
  }
  public findByName(name: string): Category {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
}
export { CategoryRepository };
