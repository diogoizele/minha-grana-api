import { Request, Response } from "express";

import { createIncome, listIncomes } from "../services/income";
import { CreateIncomeRequest } from "../typings";

class IncomeController {
  async listIncomes(req: Request, res: Response) {
    try {
      const incomes = await listIncomes(req);

      return res.status(200).json(incomes);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Failed to list incomes. ${error}` });
    }
  }

  async create(req: Request<{}, {}, CreateIncomeRequest>, res: Response) {
    try {
      const incomes = await createIncome(req);

      return res.status(200).json(incomes);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Failed to list incomes. ${error}` });
    }
  }
}

export default new IncomeController();
