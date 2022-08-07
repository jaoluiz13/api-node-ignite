import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { CategoryRepository } from "../../modules/cars/infra/typeorm/respositories/CategoryRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/respositories/SpecificationRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

// Cria um registro de um singleton que aponta para o respositorio CategoryRepository
container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
