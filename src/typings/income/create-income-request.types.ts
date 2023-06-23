import { Frequency } from "../../models";

export interface CreateIncomeRequest {
  title: string;
  percent: number;
  amount: number;

  description?: string;
  frequency?: Frequency;
  receivementMethod?: string;
  isBlocked?: boolean;
}
