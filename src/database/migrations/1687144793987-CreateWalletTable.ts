import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWalletTable1687144793987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "wallet",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "wage",
            type: "numeric",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: "patrimony",
            type: "numeric",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: "saved",
            type: "numeric",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cash_value",
            type: "numeric",
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: "account_id",
            type: "int",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "fk_account_wallet",
            columnNames: ["account_id"],
            referencedTableName: "account",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("wallet");
  }
}
