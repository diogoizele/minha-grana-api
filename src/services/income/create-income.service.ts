import { Request } from "express";

import { getAccount, getSession } from "../account";

import { createIncomeMapper } from "../../mappers";
import { CreateIncomeRequest } from "../../typings";
import { incomeRepository, itemRepository } from "../../repositories";

export async function createIncome(req: Request<{}, {}, CreateIncomeRequest>) {
  const incomeMapper = createIncomeMapper();

  try {
    const session = await getSession(req);
    const account = await getAccount(session.account.id);

    const newItem = incomeMapper.toItem(req.body);
    newItem.account = account;

    const item = await itemRepository.save(newItem);

    const newIncome = incomeMapper.toIncome(req.body);
    newIncome.item = item;

    const income = await incomeRepository.save(newIncome);

    const response = incomeMapper.toResponse(income);

    return response;
  } catch (error) {
    throw new Error("Error on create income");
  }
}
