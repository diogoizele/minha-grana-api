import { accountRepository } from "../../repositories";

export async function getAccount(id: number) {
  const account = await accountRepository.findOne({
    where: { id },
    relations: ["wallet"],
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return account;
}
