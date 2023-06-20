import { Request } from "express";
import { getAccount, getSession } from "../account";
import { walletRepository } from "../../repositories";
import { detailWalletMapper } from "../../mappers";

export async function detailWallet(req: Request) {
  try {
    const session = await getSession(req);
    const account = await getAccount(session.account.id);

    const wallet = await walletRepository.findOne({
      where: { account },
    });

    if (!wallet) throw new Error("Wallet not found");

    return detailWalletMapper(wallet);
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
