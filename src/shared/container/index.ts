import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserTokenRepository } from "../../modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "../../modules/accounts/repositories/IUserTokenRepository";
import { CarImageRepository } from "../../modules/cars/infra/typeorm/respositories/CarImageRepository";
import { CarRepository } from "../../modules/cars/infra/typeorm/respositories/CarRepository";
import { CategoryRepository } from "../../modules/cars/infra/typeorm/respositories/CategoryRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/respositories/SpecificationRepository";
import { ICarImageRepository } from "../../modules/cars/repositories/ICarImageRepository";
import { ICarRepository } from "../../modules/cars/repositories/ICarRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { IRentalRepository } from "../../modules/rentals/infra/typeorm/repositories/IRentalRepository";
import { RentalRepository } from "../../modules/rentals/repositories/RentalRepository";

import "./providers/DateProvider";
import "./providers/MailProvider";
import "./providers/StorageProvider";
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

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<ICarImageRepository>(
  "CarImageRepository",
  CarImageRepository
);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);
