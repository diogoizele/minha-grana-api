import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableExpense1687306064855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "expense",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "payment_method",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "value_in_cash",
            type: "numeric",
            scale: 2,
            precision: 10,
            isNullable: false,
          },
          {
            name: "establishment",
            type: "varchar",
            length: "255",
            isNullable: true,
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
    await queryRunner.dropTable("expense");
  }
}
