import { Router } from "express";

import { ResetPasswordUserController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passRoutes = Router();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passRoutes.post("/reset", resetPasswordUserController.handle);

export { passRoutes };
