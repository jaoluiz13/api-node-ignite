import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authRoutes = Router();
const authUserController = new AuthenticateUserController();

authRoutes.post("/sessions", authUserController.handle);

export { authRoutes };
