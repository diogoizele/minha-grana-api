import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoryTable1687304913761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "category",
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
            name: "is_custom",
            type: "boolean",
            default: false,
            isNullable: false,
          },
          {
            name: "type",
            type: "int",
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
            name: "check_type",
            expression: "type IN (0, 1)",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("category");
  }
}
