import express from "express";

import AccountControler from "../controllers/account.controller";

const router = express.Router();

// Public routes
router.post("/accounts", AccountControler.register);
router.post("/accounts/login", AccountControler.login);

// Private routes
router.get("/accounts/detail", AccountControler.detailUser);

export default router;
