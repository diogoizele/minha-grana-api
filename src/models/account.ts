import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Token } from "./token";
import { Wallet } from "./wallet";

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

  @OneToMany(() => Token, (token) => token.accountId)
  tokens: Token[];

  @OneToOne(() => Wallet, (wallet) => wallet.account)
  wallet: Wallet;
}
