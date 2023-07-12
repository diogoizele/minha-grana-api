import express from "express";
import WalletController from "../controllers/wallet.controller";

const router = express.Router();

router.post("/wallets", WalletController.createWallet);
router.get("/wallets", WalletController.detailWallet);
router.put("/wallets", WalletController.updateWallet);
router.patch("/wallets", WalletController.updateWage);
router.post("/wallets/update-patrimony", WalletController.updatePatrimony);

export default router;
