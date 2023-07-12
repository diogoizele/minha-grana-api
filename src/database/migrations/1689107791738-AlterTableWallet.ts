import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableWallet1689107791738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("wallet", [
      new TableColumn({
        name: "payment_date",
        type: "integer", // day of month
        isNullable: true,
      }),
      new TableColumn({
        name: "last_update_payment_date",
        type: "date",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("wallet", "payment_date");
    await queryRunner.dropColumn("wallet", "last_update_payment_date");
  }
}
