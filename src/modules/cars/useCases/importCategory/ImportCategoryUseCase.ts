import { parse } from "csv-parse";
import fs from "fs";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IImportyCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  loadCategory(file: Express.Multer.File): Promise<IImportyCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportyCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const existsCategory = this.categoryRepository.findByName(name);
      if (!existsCategory) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
