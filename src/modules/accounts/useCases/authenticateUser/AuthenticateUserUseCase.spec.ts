import { AppError } from "../../../../shared/errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "0000000",
      email: "emailtest@gmail.com",
      password: "123456",
      name: "user_test",
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a non existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "test@gmail.com",
        password: "12345789",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("Should not be able to authenticate a user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "999999",
      email: "emailtest2@gmail.com",
      password: "123456789",
      name: "user_test2",
    };
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: "emailtest2@gmail.com",
        password: "abcdef",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
