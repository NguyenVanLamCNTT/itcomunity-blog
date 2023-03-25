import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class V013AddColumnsForTopicTable1679412022588
  implements MigrationInterface
{
  name = 'V013AddColumnsForTopicTable1679412022588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('topic', [
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('topic', ['image']);
  }
}
