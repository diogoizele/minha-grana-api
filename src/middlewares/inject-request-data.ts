import { NextFunction, Request, Response } from "express";
import { getAccount, getSession } from "../services/account";

export async function injectRequestData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    (req.path === "/api/v1/accounts" && req.method === "POST") ||
    (req.path === "/api/v1/accounts/login" && req.method === "POST")
  ) {
    return next();
  }

  try {
    const session = await getSession(req);
    const account = await getAccount(session.account.id);
    const payload = req.body;

    req.data = { account, payload };

    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to inject request data" });
  }
}
