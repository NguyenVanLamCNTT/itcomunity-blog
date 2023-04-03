import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class V018ChangeNameAnswerTable1680536105511
  implements MigrationInterface
{
  name = 'V018ChangeNameAnswerTable1680536105511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE awnser RENAME TO answer');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE answer RENAME TO awnser');
  }
}
