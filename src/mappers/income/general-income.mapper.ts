import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

import { Income } from "../../models";

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.tz.setDefault("America/Sao_Paulo");

export function generalIncomeMapper() {
  const toDetailResponse = (entity: Income) => {
    const createdAt = dayjs(entity.item.createdAt).format();
    const updatedAt = dayjs(entity.item.updatedAt).format();

    return {
      id: entity.id,
      amount: entity.item.amount,
      title: entity.item.title,
      percent: entity.item.percent,
      frequency: entity.item.frequency,
      description: entity.item.description,
      isBlocked: entity.isBlocked,
      receivementMethod: entity.receivementMethod,
      createdAt,
      updatedAt,
    };
  };

  return {
    toDetailResponse,
  };
}
