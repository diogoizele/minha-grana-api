import jwt, { JwtPayload } from "jsonwebtoken";
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
    if (!token) throw new Error("Invalid token");

    const secret = String(process.env.JWT_SECRET);

    const decoded = jwt.verify(token, secret) as TokenSchema & JwtPayload;

    const session = await tokenRepository.findOne({
      where: { accountId: decoded.account.id },
    });

    if (!session) throw new Error("Unauthorized");

    if (session.expiresAt < new Date()) {
      await tokenRepository.delete(session);
      throw new Error("Expired token");
    }

    return next();
  } catch (error: any) {
    return res.status(401).json({ message: error.message || "Unauthorized" });
  }
}
