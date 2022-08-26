import { Router } from "express";

import { authRoutes } from "./authentication.routes";
import { carRoutes } from "./car.routes";
import { categoriesRoutes } from "./categories.routes";
import { passRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/", authRoutes);
router.use("/categories", categoriesRoutes);
router.use("/cars", carRoutes);
router.use("/password", passRoutes);
router.use("/rentals", rentalRoutes);
router.use("/specification", specificationRoutes);
router.use("/user", userRoutes);

export { router };
