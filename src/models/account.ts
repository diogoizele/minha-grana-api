import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Token } from "./token";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 128 })
  password: string;

  @OneToMany(() => Token, (token) => token.account)
  tokens: Token[];
}
