import { Request, Response } from "express";

import {
  registerAccountService,
  loginAccountService,
  detailAccount,
} from "../services/account";
import { RegisterAccountRequest } from "../typings";

class AccountControler {
  async register(req: Request<{}, {}, RegisterAccountRequest>, res: Response) {
    try {
      await registerAccountService(req.body);

      return res.status(201).json({ message: "Account created" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Failed to create account. ${error}` });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await loginAccountService(req.body);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ message: `Failed to login. ${error}` });
    }
  }

  async detailAccount(req: Request, res: Response) {
    try {
      const account = await detailAccount(req);

      return res.status(200).json(account);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Failed to detail account. ${error}` });
    }
  }
}

export default new AccountControler();
