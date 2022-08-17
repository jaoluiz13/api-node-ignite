import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

class ListAvailableCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;
    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);
    const cars = await listAvailableCarUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });

    return response.status(201).json(cars);
  }
}

export { ListAvailableCarController };
