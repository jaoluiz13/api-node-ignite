import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  public users: User[] = [];
  async create({
    driver_license,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      driver_license,
      name,
      email,
      password,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }
  async findById(user_id: string): Promise<User> {
    return this.users.find((u) => u.id === user_id);
  }
}

export { UserRepositoryInMemory };
