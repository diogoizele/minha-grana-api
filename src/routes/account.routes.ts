import express from "express";

import AccountControler from "../controllers/account.controller";
import { loginAccountValidator } from "../validators/account";
import { authenticate } from "../middlewares";

const router = express.Router();

// Public routes
router.post("/accounts", AccountControler.register);
router.post("/accounts/login", loginAccountValidator, AccountControler.login);

// Private routes
router.get("/accounts", authenticate, AccountControler.getAll);
// router.get("/accounts/:id", AccountControler.getById);
// router.put("/accounts/:id", AccountControler.update);
// router.delete("/accounts/:id", AccountControler.delete);

export default router;
