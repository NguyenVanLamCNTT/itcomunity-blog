import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class V019AddColumnsForAnswerTable1680600231563
  implements MigrationInterface
{
  name = 'V019AddColumnsForAnswerTable1680600231563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('answer', [
      new TableColumn({
        name: 'question_id',
        type: 'int',
      }),
    ]);
    await queryRunner.createForeignKey(
      'answer',
      new TableForeignKey({
        columnNames: ['question_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'question',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('answer', ['question_id']);
  }
}
