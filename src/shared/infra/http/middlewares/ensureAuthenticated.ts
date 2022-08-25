import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserTokenRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { AppError } from "../../../errors/AppErrors";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const userTokenRepository = new UserTokenRepository();
  if (!authHeader) {
    throw new AppError("Token missing from request", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = userTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );
    if (!user) {
      throw new AppError("User not found", 401);
    }
    request.user = {
      id: user_id,
    };
    next();
  } catch (e) {
    throw new AppError("Invalid Token", 401);
  }
}
