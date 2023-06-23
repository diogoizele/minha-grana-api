import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Item } from "./";

@Entity()
export class Subitem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column()
  amount: number;

  @Column()
  percent: number;

  @ManyToOne(() => Item, (item) => item.subitems)
  @JoinColumn({ name: "item_id" })
  item: Item;
}
