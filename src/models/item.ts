import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account, Frequency, Subitem, Income, Expense, Category } from "./";
import { ColumnNumericTransformer } from "../config/pg-numeric-transformer";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 512 })
  description: string;

  @Column({
    type: "numeric",
    scale: 2,
    precision: 10,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({ enum: Frequency })
  frequency: Frequency;

  @Column({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @Column({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @Column({
    type: "numeric",
    scale: 2,
    precision: 10,
    transformer: new ColumnNumericTransformer(),
  })
  percent: number;

  @OneToOne(() => Income, (income) => income.item)
  income: Income;

  @OneToOne(() => Expense, (expense) => expense.item)
  expense: Expense;

  @ManyToOne(() => Account, (account) => account.items)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => Subitem, (subitem) => subitem.item)
  subitems: Subitem[];
}
