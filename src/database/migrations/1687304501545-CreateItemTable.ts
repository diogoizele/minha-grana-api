import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItemTable1687304501545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "item",
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
            name: "description",
            type: "varchar",
            length: "512",
            isNullable: true,
          },
          {
            name: "amount",
            type: "numeric",
            scale: 2,
            precision: 10,
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
            name: "frequency",
            type: "varchar",
            length: "255",
            isNullable: false,
            default: "'ONCE'",
          },
          {
            name: "percent",
            type: "numeric",
            scale: 2,
            precision: 10,
            isNullable: false,
          },
          {
            name: "account_id",
            type: "int",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FKAccount",
            referencedTableName: "account",
            referencedColumnNames: ["id"],
            columnNames: ["account_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
        checks: [
          {
            name: "check_frequency",
            expression: "frequency in ('MONTHLY', 'ANNUAL', 'ONCE')",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("item");
  }
}
