import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
    refresh_token: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private refreshToken: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuario Existe
    const user = await this.userRepository.findByEmail(email);
    const {
      secret,
      expires_in_token,
      secret_refresh_token,
      expires_refresh_token,
      expires_refresh_token_days,
    } = auth;
    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    // Senha correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }
    // Autenticar gerando o json web token
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.refreshToken.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    const returnTokenInfo: IResponse = {
      user: {
        email: user.email,
        name: user.name,
        refresh_token,
      },
      token,
    };
    return returnTokenInfo;
  }
}
export { AuthenticateUserUseCase };
