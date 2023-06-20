import { Request, Response } from "express";

import { createWallet, detailWallet } from "../services/wallet";
import { CreateWalletRequest } from "../typings";

export class WalletController {
  public async createWallet(
    req: Request<{}, {}, CreateWalletRequest>,
    res: Response,
  ): Promise<void> {
    try {
      const wallet = await createWallet(req);
      res.status(201).json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to create wallet" });
    }
  }

  public async detailWallet(req: Request, res: Response): Promise<void> {
    try {
      const wallet = await detailWallet(req);
      res.status(200).json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to detail wallet" });
    }
  }
}

export default new WalletController();
