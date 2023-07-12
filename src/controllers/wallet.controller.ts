import { Request, Response } from "express";

import {
  createWallet,
  detailWallet,
  updatePatrimony,
  updateWage,
  updateWallet,
} from "../services/wallet";

export class WalletController {
  public async createWallet(req: Request, res: Response): Promise<void> {
    const { account, payload } = req.data;

    try {
      const wallet = await createWallet(payload, account);

      res.status(201).json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to create wallet" });
    }
  }

  public async detailWallet(req: Request, res: Response): Promise<void> {
    const { account } = req.data;

    try {
      const wallet = await detailWallet(account);
      res.status(200).json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to detail wallet" });
    }
  }

  public async updateWage(req: Request, res: Response): Promise<void> {
    const { account, payload } = req.data;

    try {
      await updateWage(payload, account);

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to update wage" });
    }
  }

  public async updateWallet(req: Request, res: Response): Promise<void> {
    try {
      const { account, payload } = req.data;

      const wallet = await updateWallet(payload, account);

      res.status(200).json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to update wallet" });
    }
  }

  public async updatePatrimony(req: Request, res: Response): Promise<void> {
    const { account } = req.data;

    try {
      const updatedPatrimony = await updatePatrimony(account);

      res.status(200).json(updatedPatrimony);
    } catch (error) {
      res.status(500).json({ error: `Failed to update patrimony: ${error}` });
    }
  }
}

export default new WalletController();
