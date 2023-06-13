import express from "express"; 
import WalletController from "../controllers/wallet.controller";

const router = express.Router();



router.post("/wallet/create", WalletController.createWallet) ;

router.put("/wallet/update/:id", WalletController.updateWallet);

//
router.get("/wallets",  WalletController.getWallets);

router.get("/wallet:id",  WalletController.getWallet);

export default router;
