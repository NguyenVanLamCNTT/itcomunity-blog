import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class V005AddSeriesPostsTable1673088835395 implements MigrationInterface {
    name = 'V005AddSeriesPostsTable1673088835395';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "series_posts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generatedIdentity: "ALWAYS",
                    },
                    {
                        name: "created",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "modified",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: 'is_deleted',
                        type: 'boolean',
                        default: false
                    },
                    {
                        name: 'series_id',
                        type: 'int',
                    },
                    {
                        name: 'posts_id',
                        type: 'int'
                    }
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "series_posts",
            new TableForeignKey({
                columnNames: ["series_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "series",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "series_posts",
            new TableForeignKey({
                columnNames: ["posts_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "posts",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE series_posts`);
    }

}