import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppErrors";
import "express-async-errors";
import createConection from "../typeorm";
import { router } from "./router";

import "../../container";
import upload from "../../../config/upload";
import rateLImiter from "./middlewares/rateLimiter";

createConection();
const app = express();

app.use(express.json());
app.use(rateLImiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(router);

// middleware de error
app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal Server Error - ${err.message}`,
  });
});

export { app };
