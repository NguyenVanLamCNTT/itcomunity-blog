import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class V020AddColumnsQuestionTable1680944322336
  implements MigrationInterface
{
  name = 'V020AddColumnsQuestionTable1680944322336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('question', [
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('question', ['title']);
  }
}
