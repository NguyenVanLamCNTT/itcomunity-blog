import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class V007AddColumnsForUserTable1676369304160
  implements MigrationInterface
{
  name = 'V007AddColumnsForUserTable1676369304160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'about',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['avatar', 'about']);
  }
}
