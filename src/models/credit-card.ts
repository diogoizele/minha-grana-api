import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./account";

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoiceDay: number;

  @Column()
  surname: string;

  @Column()
  limit: number;

  @Column()
  accountId: number;

  @ManyToOne(() => Account, (account) => account.creditCards)
  @JoinColumn({ name: "account_id" })
  account: Account;
}
