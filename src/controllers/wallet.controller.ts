import { Request, Response } from "express";
import WalletService from "../services/wallet/wallet.service";

class WalletController {
  create(req: Request, res: Response) {
    const { salary, cash, assets, saved, user_id } = req.body;

    const newWallet = WalletService.createWallet({
      salary,
      cash,
      assets,
      saved,
      user_id,
    });

    return res.status(201).json(newWallet);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const { salary, cash, assets, saved } = req.body;

    const wallet = WalletService.updateWallet(id, {
      salary,
      cash,
      assets,
      saved,
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    return res.json(wallet);
  }

  getWallets(req: Request, res: Response) {
    const wallets = WalletService.getWallets();

    return res.json(wallets);
  }

  getWalletById(req: Request, res: Response) {
    const { id } = req.params;

    const wallet = WalletService.getWalletById(id);

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    return res.json(wallet);
  }
}

export default new WalletController();
