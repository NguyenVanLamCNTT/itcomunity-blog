import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class V017ChangeNotNullToNullForCommentTable1680531959150
  implements MigrationInterface
{
  name = 'V017ChangeNotNullToNullForCommentTable1680531959150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "series_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "post_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "parent_comment_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "answer_id" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "series_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "post_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "parent_comment_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ALTER COLUMN "answer_id" SET NOT NULL`,
    );
  }
}
