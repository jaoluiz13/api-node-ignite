import { Router } from "express";

import { authRoutes } from "./authentication.routes";
import { carRoutes } from "./car.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specification", specificationRoutes);
router.use("/user", userRoutes);
router.use("/cars", carRoutes);
router.use("/", authRoutes);
export { router };
