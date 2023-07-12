import { walletRepository } from "../../repositories";
import { CreateWalletRequest } from "../../typings";
import { Account } from "../../models";

export async function createWallet(
  payload: CreateWalletRequest,
  account: Account,
) {
  const { cashValue = 0, patrimony = 0, saved = 0, wage = 0 } = payload;

  const wallet = {
    cashValue,
    patrimony,
    saved,
    wage,
    account,
  };

  try {
    return await walletRepository.save(wallet);
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
