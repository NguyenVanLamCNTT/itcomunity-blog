import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class V002AddAuthorFollowersTable1673084226574
  implements MigrationInterface
{
  name = 'V002AddAuthorFollowersTable1673084226574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'author_followers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generatedIdentity: 'BY DEFAULT',
            isGenerated: true,
          },
          {
            name: 'created',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'modified',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'author_user_id',
            type: 'int',
          },
          {
            name: 'followers_user_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'author_followers',
      new TableForeignKey({
        columnNames: ['author_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'author_followers',
      new TableForeignKey({
        columnNames: ['followers_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE author_followers`);
  }
}
