import { Request, Response } from "express";
import { WalletService } from "../services/wallet/wallet.service";

export class WalletController {
  private walletService: WalletService;

  constructor() {
    this.walletService = new WalletService();
  }

  public async createWallet(req: Request, res: Response): Promise<void> {
    try {
      const { wage, patrimony, saved, cashValue, accountId } = req.body;
      const wallet = await this.walletService.createWallet(
        wage,
        patrimony,
        saved,
        cashValue,
        accountId
      );
      res.status(201).json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to create wallet" });
    }
  }

  public async getWallets(req: Request, res: Response): Promise<void> {
    try {
      const wallets = await this.walletService.getWallets();
      res.status(200).json(wallets);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve wallets" });
    }
  }

  public async getWallet(req: Request, res: Response): Promise<void> {
    try {
      const walletId = parseInt(req.params.id);
      const wallet = await this.walletService.getWallet(walletId);
      if (wallet) {
        res.status(200).json(wallet);
      } else {
        res.status(404).json({ error: "Wallet not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve wallet" });
    }
  }

  public async updateWallet(req: Request, res: Response): Promise<void> {
    try {
      const walletId = parseInt(req.params.id);
      const { wage, patrimony, saved, cashValue, accountId } = req.body;
      const updatedWallet = await this.walletService.updateWallet(
        walletId,
        wage,
        patrimony,
        saved,
        cashValue,
        accountId
      );
      if (updatedWallet) {
        res.status(200).json(updatedWallet);
      } else {
        res.status(404).json({ error: "Wallet not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update wallet" });
    }
  }

  public async deleteWallet(req: Request, res: Response): Promise<void> {
    try {
      const walletId = parseInt(req.params.id);
      const deletedWallet = await this.walletService.deleteWallet(walletId);
      if (deletedWallet) {
        res.status(200).json(deletedWallet);
      } else {
        res.status(404).json({ error: "Wallet not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete wallet" });
    }
  }
}

export default new WalletController();
 