import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppErrors";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

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
    const { sub: user_id } = verify(
      token,
      "42e617ce4e62fa27c625fe6a68b542aa"
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found", 401);
    }
    next();
  } catch (e) {
    throw new AppError("Invalid Token", 401);
  }
}
