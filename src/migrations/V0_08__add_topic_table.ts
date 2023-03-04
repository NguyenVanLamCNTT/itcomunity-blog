import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class V008AddTopicTable1677149496694 implements MigrationInterface {
  name = 'V008AddTopicTable1677149496694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'topic',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'followers_number',
            type: 'int',
            default: 0,
          },
          {
            name: 'answer_number',
            type: 'int',
            default: 0,
          },
          {
            name: 'post_number',
            type: 'int',
            default: 0,
          },
          {
            name: 'is_trending',
            type: 'boolean',
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE topic`);
  }
}
