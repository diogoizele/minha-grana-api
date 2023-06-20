import express from "express";
import WalletController from "../controllers/wallet.controller";

const router = express.Router();

router.post("/wallets", WalletController.createWallet);
router.get("/wallets", WalletController.detailWallet);

export default router;
