import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateColumnCategoryAtItemTable1687305289597
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "item",
      new TableColumn({
        name: "category_id",
        type: "int",
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      "item",
      new TableForeignKey({
        name: "FKCategory",
        referencedTableName: "category",
        referencedColumnNames: ["id"],
        columnNames: ["category_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("item", "FKCategory");
    await queryRunner.dropColumn("item", "category_id");
  }
}
