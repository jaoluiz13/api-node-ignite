import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

interface ICarRepository {
  create(data: ICreateCarDTO): void;
}

export { ICarRepository };
