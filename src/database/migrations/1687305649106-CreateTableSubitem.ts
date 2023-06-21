import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableSubitem1687305649106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "subitem",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "amount",
            type: "numeric",
            scale: 2,
            precision: 10,
            isNullable: false,
          },
          {
            name: "item_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "percent",
            type: "numeric",
            scale: 2,
            precision: 10,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("subitem");
  }
}
