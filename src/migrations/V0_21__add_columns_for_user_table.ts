import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class V021AddColumnsForUserTable1681212483712
  implements MigrationInterface
{
  name = 'V021AddColumnsForUserTable1681212483712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'series_number',
        type: 'int',
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: 'questions_number',
        type: 'int',
        isNullable: true,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['series_number', 'question_number']);
  }
}
