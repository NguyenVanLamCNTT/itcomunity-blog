import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class V016AddCommentsTable1679824519270 implements MigrationInterface {
  name = 'V016AddCommentsTable1679824519270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
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
            name: 'parent_comment_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'post_id',
            type: 'int',
          },
          {
            name: 'series_id',
            type: 'int',
          },
          {
            name: 'answer_id',
            type: 'int',
          },
          {
            name: 'report_number',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['series_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'series',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['parent_comment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['answer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'awnser',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE comments`);
  }
}
