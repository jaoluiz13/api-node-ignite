import { Request, Response, NextFunction } from "express";

import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "../../../errors/AppErrors";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;
  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);
  if (!user.is_admin) {
    throw new AppError("User is not a admin");
  }
  return next();
}
