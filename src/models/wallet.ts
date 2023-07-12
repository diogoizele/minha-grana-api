import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";

import { Account } from "./";
import { ColumnNumericTransformer } from "../config/pg-numeric-transformer";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  wage: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  patrimony: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  saved: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    name: "cash_value",
    transformer: new ColumnNumericTransformer(),
  })
  cashValue: number;

  @Column({
    type: "integer",
    name: "payment_date",
    nullable: true,
  })
  paymentDate: number;

  @Column({
    type: "date",
    name: "last_update_payment_date",
    nullable: true,
  })
  lastUpdatePaymentDate: Date;

  @OneToOne(() => Account, (account) => account.wallet)
  @JoinColumn({ name: "account_id" })
  account: Account;

  constructor(account: Account) {
    this.wage = 0;
    this.patrimony = 0;
    this.saved = 0;
    this.cashValue = 0;
    this.account = account;
  }
}
