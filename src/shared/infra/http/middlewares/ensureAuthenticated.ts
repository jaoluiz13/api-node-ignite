import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
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

  if (!authHeader) {
    throw new AppError("Token missing from request", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret) as IPayload;

    const userRepository = new UserRepository();

    request.user = {
      id: user_id,
    };
    next();
  } catch (e) {
    throw new AppError("Invalid Token", 401);
  }
}
