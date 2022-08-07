import "reflect-metadata";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "../../errors/AppErrors";
import "express-async-errors";
import swaggerFile from "../../../swagger.json";
import { router } from "./router";

import "../typeorm";
import "../../container";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
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

app.listen(3333, () => {
  console.log("rodando na porta 3333");
});
