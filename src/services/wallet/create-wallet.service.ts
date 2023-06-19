import { Request } from "express";

import { walletRepository } from "../../repositories";
import { getSession, getAccount } from "../account";
import { CreateWalletRequest } from "../../typings";

export async function createWallet(req: Request<{}, {}, CreateWalletRequest>) {
  const { cashValue = 0, patrimony = 0, saved = 0, wage = 0 } = req.body;
  const session = await getSession(req);

  const account = await getAccount(session.account.id);

  const wallet = {
    cashValue,
    patrimony,
    saved,
    wage,
    account,
  };

  return await walletRepository.save(wallet);
}
