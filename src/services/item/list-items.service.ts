import { Request } from "express";

import { getSession } from "../account";
import { itemRepository } from "../../repositories";

const DEFAULT_FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export async function listItems(req: Request) {
  const { page: queryPage, pageSize: queryPageSize } = req.query;

  try {
    const { account } = await getSession(req);

    const page = Number(queryPage) || DEFAULT_FIRST_PAGE;
    const pageSize = Number(queryPageSize) || DEFAULT_PAGE_SIZE;

    const skip = (page - 1) * pageSize;

    const items = await itemRepository.find({
      where: { account },
      skip,
      take: pageSize,
    });

    return items;
  } catch (error) {
    throw new Error("Error on list items");
  }
}
