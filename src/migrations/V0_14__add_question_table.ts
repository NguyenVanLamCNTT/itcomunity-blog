import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class V014AddQuestionTable1679820404217 implements MigrationInterface {
  name = 'V014AddQuestionTable1679820404217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'question',
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
            name: 'content',
            type: 'text',
          },
          {
            name: 'keywords',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'view_number',
            type: 'int',
            default: 0,
          },
          {
            name: 'book_mark_number',
            type: 'int',
            default: 0,
          },
          {
            name: 'comment_number',
            type: 'int',
            default: 0,
          },
          {
            name: 'is_trending',
            type: 'boolean',
            default: false,
          },
          {
            name: 'author_user_id',
            type: 'int',
          },
          {
            name: 'answer_number',
            type: 'int',
            default: 0,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'question',
      new TableForeignKey({
        columnNames: ['author_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE question`);
  }
}
