import { Request, Response } from "express";

export async function routeNotFound(_: Request, res: Response) {
  res.status(404).json({ message: "Route not found" });
}
