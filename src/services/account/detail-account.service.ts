import { Request } from "express";

import { getSession, getAccount } from ".";
import { detailAccountMapper } from "../../mappers";

export async function detailAccount(req: Request) {
  try {
    const session = await getSession(req);
    const account = await getAccount(session.account.id);

    console.log(account);

    return detailAccountMapper(account);
  } catch (error) {
    throw new Error("Error on get account");
  }
}
