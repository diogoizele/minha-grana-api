import express from "express"; 
import WalletController from "../controllers/wallet.controller";

const router = express.Router();



router.post("/wallet/create",   WalletController.create) ;

router.put("/wallet/update/:id",  WalletController.update);

//
router.get("/wallets",  WalletController.getWallets);

router.get("/wallet:id",  WalletController.getWalletById);

export default router;
