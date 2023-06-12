import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Invalid token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      accountId: string;
    };

    req.body.accountId = decoded.accountId;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
