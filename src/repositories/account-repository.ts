import { AppDataSource } from "../config/data-source";
import { Account } from "../models/account";

export const accountRepository = AppDataSource.getRepository(Account);
