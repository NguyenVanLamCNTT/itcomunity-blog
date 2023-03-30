import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class V015AddAnswerTable1679824317780 implements MigrationInterface {
  name = 'V015AddAnswerTable1679824317780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'awnser',
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
            name: 'author_user_id',
            type: 'int',
          },
          {
            name: 'is_approved',
            type: 'boolean',
            default: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'awnser',
      new TableForeignKey({
        columnNames: ['author_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE awnser`);
  }
}
