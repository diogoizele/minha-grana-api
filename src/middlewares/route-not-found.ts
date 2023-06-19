import { Request, Response, NextFunction } from "express";

export async function routeNotFound(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({
    message: "Route not found",
  });

  next();
}
