import { walletRepository } from "../../repositories";

import { UpdateWageRequest } from "../../typings";
import { Account } from "../../models";

export async function updateWage(payload: UpdateWageRequest, account: Account) {
  try {
    const wallet = await walletRepository.findOne({
      where: { account },
    });

    if (!wallet) throw new Error("Wallet not found");

    const { wage } = payload;

    wallet.wage = wage;

    await walletRepository.save(wallet);
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
