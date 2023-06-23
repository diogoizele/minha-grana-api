import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account, Item } from "./";

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
