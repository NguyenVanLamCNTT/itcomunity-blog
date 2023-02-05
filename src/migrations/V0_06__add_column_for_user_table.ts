import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class V006AddColumnForUserTable1675263567072
  implements MigrationInterface
{
  name = 'V006AddColumnsForUserTable1675263567072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'is_confirm_email',
        type: 'boolean',
        isNullable: true,
        default: false,
      }),
      new TableColumn({
        name: 'is_admin',
        type: 'boolean',
        isNullable: true,
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['is_confirm_email', 'is_admin']);
  }
}
