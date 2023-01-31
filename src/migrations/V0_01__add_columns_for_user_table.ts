import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class V001AddColumnsForUserTable1673080974472
  implements MigrationInterface
{
  name = 'V001AddColumnsForUserTable1673080974472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'last_login',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'followers_number',
        type: 'int',
        default: 0,
      }),
      new TableColumn({
        name: 'posts_number',
        type: 'int',
        default: 0,
      }),
      new TableColumn({
        name: 'likes_number',
        type: 'int',
        default: 0,
      }),
      new TableColumn({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', [
      'last_login',
      'followers_number',
      'posts_number',
      'likes_number',
      'is_deleted',
    ]);
  }
}
