import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUSeCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuario Existe
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email or password incorrect");
    }
    console.log(user.password, password);
    // Senha correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }
    // Autenticar gerando o json web token
    const token = sign({}, "42e617ce4e62fa27c625fe6a68b542aa", {
      subject: user.id,
      expiresIn: "1d",
    });

    const returnTokenInfo: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
    return returnTokenInfo;
  }
}
export { AuthenticateUserUSeCase };
