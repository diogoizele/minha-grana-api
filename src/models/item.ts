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

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 512 })
  description: string;

  @Column()
  amount: number;

  @Column()
  frequency: Frequency;

  @Column()
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
