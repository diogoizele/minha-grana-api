import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ name: "expires_at" })
  expiresAt: Date;

  @Column({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.tokens)
  @JoinColumn({ name: "account_id" })
  account: Account;
}
