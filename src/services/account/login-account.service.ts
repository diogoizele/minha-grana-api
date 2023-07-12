import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { accountRepository, tokenRepository } from "../../repositories";
import { LoginAccountRequest, TokenSchema } from "../../typings";
import { updatePatrimony } from "../wallet";

export async function loginAccountService(loginPayload: LoginAccountRequest) {
  const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

  const { email, password } = loginPayload;

  try {
    const account = await accountRepository.findOne({ where: { email } });
    if (!account) throw new Error("Account not found");

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const session = await tokenRepository.findOne({
      where: { account },
    });

    if (session) await tokenRepository.remove(session);

    const secret = String(process.env.JWT_SECRET);

    const tokenObject: TokenSchema = {
      account: {
        id: account.id,
        name: account.name,
      },
    };

    const token = jwt.sign(tokenObject, secret, {
      expiresIn: TOKEN_EXPIRATION,
    });
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION);

    const newSession = {
      account,
      token,
      expiresAt,
    };

    await tokenRepository.save(newSession);

    await updatePatrimony(account);

    return token;
  } catch (error: any) {
    throw new Error(String(error.message));
  }
}
