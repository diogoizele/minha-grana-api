import { AppDataSource } from "../config/data-source";
import { Item } from "../models";

export const itemRepository = AppDataSource.getRepository(Item);
