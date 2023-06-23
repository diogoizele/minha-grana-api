import { Request } from "express";

import { getAccount, getSession } from "../account";

import { createIncomeMapper } from "../../mappers";
import { CreateIncomeRequest } from "../../typings";
import {
  incomeRepository,
  itemRepository,
  walletRepository,
} from "../../repositories";

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

    const wallet = await walletRepository.findOne({
      where: { account: account },
    });

    if (wallet) {
      if (!income.isBlocked) wallet.cashValue += income.item.amount;
      wallet.patrimony += income.item.amount;

      await walletRepository.save(wallet);
    }

    const response = incomeMapper.toResponse(income);

    return response;
  } catch (error) {
    throw new Error("Error on create income");
  }
}
