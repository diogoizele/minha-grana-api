import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";

import { Account } from "./account";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  wage: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  patrimony: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  saved: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  cashValue: number;

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
