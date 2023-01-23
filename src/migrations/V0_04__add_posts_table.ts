import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class V004AddPostsTable1673088217710 implements MigrationInterface {
    name = 'V004AddPostsTable1673088217710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
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
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'author_user_id',
                        type: 'int'
                    },
                    {
                        name: 'keywords',
                        type: 'varchar',
                        isArray: true
                    },
                    {
                        name: 'content',
                        type: 'text',
                    },
                    {
                        name: 'view_number',
                        type: 'int'
                    },
                    {
                        name: 'book_mark_number',
                        type: 'int'
                    },
                    {
                        name: 'comment_number',
                        type: 'int'
                    },
                    {
                        name: 'image_thumbnail',
                        type: 'varchar'
                    },
                    {
                        name: 'is_trending',
                        type: 'boolean'
                    }
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "posts",
            new TableForeignKey({
                columnNames: ["author_user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE posts`);
    }

}