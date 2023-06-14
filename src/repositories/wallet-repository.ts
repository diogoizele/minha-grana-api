import { AppDataSource } from "../config/data-source";
import { Wallet } from "../models/wallet";

export const walletRepository = AppDataSource.getRepository(Wallet);
