import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new AppError("Invalid Token");
    }

    const dateNow = this.dateProvider.dateNow();
    const dateToken = userToken.expires_date;
    const tokenDateisInValid = this.dateProvider.compareIfBefore(
      dateToken,
      dateNow
    );

    if (tokenDateisInValid) {
      throw new AppError("Invalid Token");
    }

    const user = await this.userRepository.findById(userToken.user_id);
    user.password = await hash(password, 8);

    await this.userRepository.create(user);
    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
