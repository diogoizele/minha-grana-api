import { Income, Item } from "../../models";
import { CreateIncomeRequest } from "../../typings";

export function createIncomeMapper() {
  const toItem = (data: CreateIncomeRequest) => {
    const newItem = new Item();
    newItem.amount = data.amount;
    newItem.title = data.title;
    newItem.percent = data.percent;

    if (data.frequency) newItem.frequency = data.frequency;
    if (data.description) newItem.description = data.description;

    return newItem;
  };

  const toIncome = (data: CreateIncomeRequest) => {
    const newIncome = new Income();

    if (data.isBlocked) newIncome.isBlocked = data.isBlocked;
    if (data.receivementMethod)
      newIncome.receivementMethod = data.receivementMethod;

    return newIncome;
  };

  const toResponse = (entity: Income) => {
    return {
      id: entity.id,
      amount: entity.item.amount,
      title: entity.item.title,
      percent: entity.item.percent,
      frequency: entity.item.frequency,
      description: entity.item.description,
      isBlocked: entity.isBlocked,
      receivementMethod: entity.receivementMethod,
    };
  };

  return { toItem, toIncome, toResponse };
}
