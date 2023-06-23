import { Income } from "../../models";

export function generalIncomeMapper() {
  const toDetailResponse = (entity: Income) => {
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

  return {
    toDetailResponse,
  };
}
