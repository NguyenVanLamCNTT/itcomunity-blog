import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class V012AddColumnForSeriesTable1678376303411
  implements MigrationInterface
{
  name = 'V012AddColumnForSeriesTable1678376303411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('series', [
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('series', ['status']);
  }
}
