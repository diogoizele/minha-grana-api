import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { tokenRepository } from "../repositories";
import { TokenSchema } from "../typings";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    (req.path === "/api/accounts" && req.method === "POST") ||
    (req.path === "/api/accounts/login" && req.method === "POST")
  ) {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Invalid token");
    }

    const secret = String(process.env.JWT_SECRET);

    const decoded = jwt.verify(token, secret);

    const session = await tokenRepository.findOne({
      where: { id: (decoded as TokenSchema).id },
    });

    if (!session) {
      throw new Error("Invalid token");
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
