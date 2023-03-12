import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class V011AddColumnForPostTable1678375561288
  implements MigrationInterface
{
  name = 'V011AddColumnForPostTable1678375561288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('posts', [
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('posts', ['status']);
  }
}
