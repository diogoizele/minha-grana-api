import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  wage!: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  patrimony!: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  saved!: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  cashValue!: number;

  @Column()
  accountId!: number;
}
