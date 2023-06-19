import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ name: "account_id" })
  accountId: number;
}
