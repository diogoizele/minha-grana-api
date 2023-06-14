import { Account } from "../../models/account";

export function detailAccountMapper(account: Account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    wallet: account.wallet,
  };
}
