import dayjs from "dayjs";

import { walletRepository } from "../../repositories";
import { Account } from "../../models";

export async function updatePatrimony(account: Account) {
  const wallet = await walletRepository.findOne({
    where: { account },
  });

  if (!wallet) throw new Error("Wallet not found");

  const { patrimony, lastUpdatePaymentDate, paymentDate, wage } = wallet;

  const now = dayjs();
  const lastUpdate = dayjs(lastUpdatePaymentDate);
  const today = now.get("D");
  const monthsAccumulated = now.diff(lastUpdate, "months");

  let newPatrimony = patrimony;
  let shouldUpdate = false;
  let message = "Patrimony not updated";

  if (
    monthsAccumulated === 0 &&
    lastUpdate.month() === now.month() &&
    lastUpdate.year() === now.year()
  ) {
    if (lastUpdate.get("D") < paymentDate && today >= paymentDate) {
      shouldUpdate = true;
      newPatrimony += wage;
    } else {
      message = "Patrimony already updated this month";
    }
  } else {
    if (today >= paymentDate) {
      shouldUpdate = true;
      newPatrimony += wage;
    }

    if (monthsAccumulated > 0) {
      shouldUpdate = true;
      newPatrimony += wage * monthsAccumulated;
    }
  }

  try {
    if (shouldUpdate) {
      wallet.patrimony = newPatrimony;
      wallet.lastUpdatePaymentDate = now.toDate();

      await walletRepository.save(wallet);

      return {
        message: "Patrimony updated",
        updated: true,
      };
    }

    return {
      message,
      updated: false,
    };
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
