import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Wallet {
  @PrimaryColumn()
  id: string;

  @Column()
  salary: number;

  @Column()
  cash: number;

  @Column()
  assets: number;

  @Column({ nullable: true })
  saved?: number;

  @Column()
  user_id: string;
}
