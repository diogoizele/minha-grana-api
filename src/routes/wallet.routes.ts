import express from "express";
import WalletController from "../controllers/wallet.controller";

const router = express.Router();

router.post("/wallet", WalletController.createWallet);
// router.get("/wallet", WalletController.getWallets);
// router.get("/wallet/:id", WalletController.getWallet);
// router.put("/wallet/:id", WalletController.updateWallet);
// router.delete("/wallet/:id", WalletController.deleteWallet);

export default router;
