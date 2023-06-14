import { Request, Response } from "express";

export async function routeNotFound(req: Request, res: Response) {
  return res.status(404).json({ message: "Source not found" });
}
