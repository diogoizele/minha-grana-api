import "dotenv/config";
import { DataSource } from "typeorm";

const password = String(process.env.DATABASE_PASSWORD);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password,
  database: process.env.DATABASE_NAME,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  migrationsTableName: "migrations_typeorm",
  synchronize: false,
  logging: true,
});
