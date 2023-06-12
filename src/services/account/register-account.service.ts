import bcrypt from "bcrypt";

import { accountRepository } from "../../repositories";
import { encrypt } from "../../config/encrypt";
import { RegisterAccountRequest } from "../../typings";

export async function registerAccountService(
  registerPayload: RegisterAccountRequest,
) {
  const { name, email, password } = registerPayload;

  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const salt = await bcrypt.genSalt(encrypt.saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const newAccount = {
    name,
    email,
    password: hash,
  };

  await accountRepository.save(newAccount);

  return true;
}
