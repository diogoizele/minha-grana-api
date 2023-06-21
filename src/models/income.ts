import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./item";

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, name: "receivement_method" })
  receivementMethod: string;

  @Column()
  isBlocked: boolean;

  @OneToOne(() => Item, (item) => item.income)
  @JoinColumn({ name: "item_id" })
  item: Item;
}
