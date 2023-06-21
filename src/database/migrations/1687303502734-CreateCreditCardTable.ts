import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCreditCardTable1687303502734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "credit_card",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "invoice_day",
            type: "int",
            isNullable: false,
          },
          {
            name: "surname",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "limit",
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("credit_card");
  }
}
