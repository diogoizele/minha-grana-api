import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Token, Wallet, CreditCard, Item, Category } from "./";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 128 })
  password: string;

  @OneToMany(() => Token, (token) => token.account)
  tokens: Token[];

  @OneToOne(() => Wallet, (wallet) => wallet.account)
  wallet: Wallet;

  @OneToMany(() => CreditCard, (creditCard) => creditCard.account)
  creditCards: CreditCard[];

  @OneToMany(() => Item, (item) => item.account)
  items: Item[];

  @OneToMany(() => Category, (category) => category.account)
  categories: Category[];
}
