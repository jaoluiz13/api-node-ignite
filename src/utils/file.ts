import fs from "fs";

import { AppError } from "../shared/errors/AppErrors";

export const deleteFile = (fileName: string) => {
  try {
    fs.stat(fileName, (err, stat) => {
      return stat;
    });
  } catch (err) {
    return;
  }
  fs.unlink(fileName, (err) => {
    throw new AppError("File not found");
  });
};
