// import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// export class V014AddCommentsTable1679494847958
//   implements MigrationInterface
// {
//   name = 'V014AddCommentsTable1679494847958';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.addColumns('topic', [
//       new TableColumn({
//         name: 'image',
//         type: 'varchar',
//         isNullable: true,
//       }),
//     ]);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropColumns('topic', ['image']);
//   }
// }
