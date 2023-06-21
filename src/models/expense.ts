import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./item";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, name: "payment_method" })
  paymentMethod: string;

  @Column({ name: "value_in_cash" })
  valueInCash: number;

  @Column({ length: 255 })
  established: string;

  @OneToOne(() => Item, (item) => item.expense)
  @JoinColumn({ name: "item_id" })
  item: Item;
}
