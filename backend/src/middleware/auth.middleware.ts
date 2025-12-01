import type { Request, Response, NextFunction } from "express";
import  { ApiError } from "../utils/ApiError";
import  { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authorization header missing"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired access token"));
  }
};
