import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { IUserTokenRepository } from "../IUserTokenRepository";

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  userToken: UserToken[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const user_token = new UserToken();
    Object.assign(user_token, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.userToken.push(user_token);

    return user_token;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const user_token = this.userToken.find(
      (ut) => ut.id === user_id && ut.refresh_token === refresh_token
    );
    return user_token;
  }
  async deleteById(id: string): Promise<void> {
    const user_token = this.userToken.find((ut) => ut.id === id);
    this.userToken.slice(this.userToken.indexOf(user_token));
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const user_token = this.userToken.find(
      (ut) => ut.refresh_token === refresh_token
    );
    return user_token;
  }
}

export { UserTokenRepositoryInMemory };
