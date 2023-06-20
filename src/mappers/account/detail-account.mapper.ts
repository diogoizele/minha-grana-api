import { Account } from "../../models/account";
import { detailWalletMapper } from "../wallet/detail-wallet.mapper";

export function detailAccountMapper(account: Account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    wallet: detailWalletMapper(account.wallet),
  };
}
