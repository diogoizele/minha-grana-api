import dayjs from "dayjs";

import { walletRepository } from "../../repositories";
import { UpdateWalletRequest } from "../../typings";
import { detailWalletMapper } from "../../mappers";
import { Account } from "../../models";

export async function updateWallet(
  payload: UpdateWalletRequest,
  account: Account,
) {
  try {
    const wallet = await walletRepository.findOne({
      where: { account },
    });

    if (!wallet) throw new Error("Wallet not found");

    const { wage, cashValue, lastUpdatePaymentDate, paymentDate, saved } =
      payload;

    const now = dayjs();

    wallet.wage = wage;
    wallet.cashValue = cashValue;
    wallet.lastUpdatePaymentDate = lastUpdatePaymentDate || now.toDate();
    wallet.paymentDate = paymentDate;
    wallet.saved = saved;

    await walletRepository.save(wallet);

    return detailWalletMapper(wallet);
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
