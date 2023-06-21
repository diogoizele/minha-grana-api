import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Frequency } from "./frequency";
import { Account } from "./account";
import { Subitem } from "./subitem";
import { Category } from "./category";
import { Income } from "./income";
import { Expense } from "./expense";

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
