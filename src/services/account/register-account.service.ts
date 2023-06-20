import bcrypt from "bcrypt";

import { accountRepository, walletRepository } from "../../repositories";
import { encrypt } from "../../config/encrypt";
import { Wallet } from "../../models/wallet";
import { RegisterAccountRequest } from "../../typings";

export async function registerAccountService(
  registerPayload: RegisterAccountRequest,
) {
  const { name, email, password } = registerPayload;

  try {
    const salt = await bcrypt.genSalt(encrypt.saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const account = await accountRepository.save({
      name,
      email,
      password: hash,
    });

    const wallet = new Wallet(account);
    await walletRepository.save(wallet);

    return true;
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
