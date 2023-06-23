import express from "express";

import IncomeController from "../controllers/income.controller";

const router = express.Router();

router.get("/incomes", IncomeController.listIncomes);
router.post("/incomes", IncomeController.create);

export default router;
