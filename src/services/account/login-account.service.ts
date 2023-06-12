import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { accountRepository, tokenRepository } from "../../repositories";
import { LoginAccountRequest } from "../../typings";

export async function loginAccountService(loginPayload: LoginAccountRequest) {
  const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

  const { email, password } = loginPayload;

  const account = await accountRepository.findOne({ where: { email } });

  if (!account) throw new Error("Account not found");

  const isPasswordValid = await bcrypt.compare(password, account.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const session = await tokenRepository.findOne({ where: { account } });

  if (session) await tokenRepository.delete(session);

  const secret = String(process.env.JWT_SECRET);
  const token = jwt.sign({ id: account.id }, secret, {
    expiresIn: TOKEN_EXPIRATION,
  });

  const newSession = {
    account,
    token,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRATION),
  };

  await tokenRepository.save(newSession);

  return token;
}
