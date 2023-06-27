import { Request } from "express";

import { getSession } from "../account";
import { incomeRepository } from "../../repositories";
import { generalIncomeMapper } from "../../mappers";

const DEFAULT_FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export async function listIncomes(req: Request) {
  const { page: queryPage, pageSize: queryPageSize } = req.query;
  const { toDetailResponse } = generalIncomeMapper();

  try {
    const { account } = await getSession(req);

    const page = Number(queryPage) || DEFAULT_FIRST_PAGE;
    const pageSize = Number(queryPageSize) || DEFAULT_PAGE_SIZE;

    const skip = (page - 1) * pageSize;

    const incomes = await incomeRepository.find({
      where: { item: { account } },
      relations: ["item"],
      skip,
      take: pageSize,
    });

    console.log("INCOMES:", incomes);

    const response = incomes.map(toDetailResponse);
    console.log("RESP", response);

    return response;
  } catch (error) {
    throw new Error("Error on list incomes");
  }
}
