import express from "express";

import { categoriesRoutes } from "./router/categories.routes";
import { specificationRoutes } from "./router/specification.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specification", specificationRoutes);

app.listen(3333, () => {
  console.log("rodando na porta 3333");
});
