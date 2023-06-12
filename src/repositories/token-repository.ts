import { AppDataSource } from "../config/data-source";
import { Token } from "../models/token";

export const tokenRepository = AppDataSource.getRepository(Token);
