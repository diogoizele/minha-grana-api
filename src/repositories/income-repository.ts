import { AppDataSource } from "../config/data-source";
import { Income } from "../models";

export const incomeRepository = AppDataSource.getRepository(Income);
