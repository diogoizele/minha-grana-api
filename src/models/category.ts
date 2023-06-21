import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account";
import { Item } from "./item";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column()
  isCustom: boolean;

  @Column()
  type: number;

  @ManyToOne(() => Account, (account) => account.categories)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
