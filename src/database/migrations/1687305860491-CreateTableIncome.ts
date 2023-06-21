import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableIncome1687305860491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "income",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "receivement_method",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "is_blocked",
            type: "boolean",
            default: false,
          },
          {
            name: "item_id",
            type: "int",
            isNullable: false,
          },
        ],

        foreignKeys: [
          {
            name: "FKItem",
            referencedTableName: "item",
            referencedColumnNames: ["id"],
            columnNames: ["item_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("income");
  }
}
