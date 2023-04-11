import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class V022AddColumnsForTopicTable1681213306009
  implements MigrationInterface
{
  name = 'V022AddColumnsForTopicTable1681213306009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('topic', [
      new TableColumn({
        name: 'questions_number',
        type: 'int',
        isNullable: true,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('topic', ['questions_number']);
  }
}
