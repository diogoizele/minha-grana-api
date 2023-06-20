import { Wallet } from "../../models/wallet";

export function detailWalletMapper(wallet: Wallet) {
  return {
    id: wallet.id,
    wage: wallet.wage,
    patrimony: wallet.patrimony,
    saved: wallet.saved,
    cashValue: wallet.cashValue,
  };
}
