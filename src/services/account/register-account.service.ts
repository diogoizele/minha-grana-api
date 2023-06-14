import bcrypt from "bcrypt";

import { accountRepository, walletRepository } from "../../repositories";
import { encrypt } from "../../config/encrypt";
import { RegisterAccountRequest } from "../../typings";
import { Wallet } from "../../models/wallet";

export async function registerAccountService(
  registerPayload: RegisterAccountRequest,
) {
  const { name, email, password } = registerPayload;

  const salt = await bcrypt.genSalt(encrypt.saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const newAccount = {
    name,
    email,
    password: hash,
  };

  const account = await accountRepository.save(newAccount);

  const wallet = new Wallet(account);

  await walletRepository.save(wallet);

  return true;
}
