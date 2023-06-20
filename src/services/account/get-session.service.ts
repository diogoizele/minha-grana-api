import jwt from "jsonwebtoken";

import { tokenRepository } from "../../repositories";
import { TokenSchema } from "../../typings";
import { Request } from "express";

export async function getSession(req: Request) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("Invalid token");

  const secret = String(process.env.JWT_SECRET);
  const decoded = jwt.verify(token, secret) as TokenSchema;

  const session = await tokenRepository.findOne({
    where: { account: decoded.account },
  });

  return {
    ...session,
    account: {
      id: decoded.account.id,
    },
  };
}
