import { walletRepository } from "../../repositories";
import { detailWalletMapper } from "../../mappers";
import { Account } from "../../models";

export async function detailWallet(account: Account) {
  try {
    const wallet = await walletRepository.findOne({
      where: { account },
    });

    if (!wallet) throw new Error("Wallet not found");

    return detailWalletMapper(wallet);
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
