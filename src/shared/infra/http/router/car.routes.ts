import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadImageCar = new UploadCarImageController();

const upload = multer(uploadConfig);

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get("/available", listAvailableCarController.handle);

carRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.any(),
  uploadImageCar.handle
);

export { carRoutes };
