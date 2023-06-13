import express from "express";
import WalletController from "../controllers/wallet.controller";

const router = express.Router();

router.post("/wallets", WalletController.createWallet);
router.put("/wallets/:id", WalletController.updateWallet);
router.get("/wallets", WalletController.getWallets);
router.get("/wallets/:id", WalletController.getWallet);

export default router;
