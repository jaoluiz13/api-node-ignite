import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";

const authRoutes = Router();
const authUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/sessions", authUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);
export { authRoutes };
