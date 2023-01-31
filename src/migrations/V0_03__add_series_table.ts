import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class V003AddSeriesTable1673087685523 implements MigrationInterface {
  name = 'V003AddSeriesTable1673087685523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'series',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generatedIdentity: 'ALWAYS',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'author_user_id',
            type: 'int',
          },
          {
            name: 'keywords',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'view_number',
            type: 'int',
          },
          {
            name: 'book_mark_number',
            type: 'int',
          },
          {
            name: 'comment_number',
            type: 'int',
          },
          {
            name: 'is_trending',
            type: 'boolean',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'series',
      new TableForeignKey({
        columnNames: ['author_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE series`);
  }
}
