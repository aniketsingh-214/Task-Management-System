import type { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validateRequest =
  (schema: ZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const firstError = error.errors?.[0]?.message || "Invalid data";
      next(new ApiError(400, firstError));
    }
  };
