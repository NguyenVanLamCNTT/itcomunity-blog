"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V004AddPostsTable1673088217710 = void 0;
const typeorm_1 = require("typeorm");
class V004AddPostsTable1673088217710 {
    constructor() {
        this.name = 'V004AddPostsTable1673088217710';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'posts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generatedIdentity: 'ALWAYS',
                },
                {
                    name: 'created',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'modified',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'is_deleted',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'author_user_id',
                    type: 'int',
                },
                {
                    name: 'keywords',
                    type: 'varchar',
                    isArray: true,
                },
                {
                    name: 'content',
                    type: 'text',
                },
                {
                    name: 'view_number',
                    type: 'int',
                },
                {
                    name: 'book_mark_number',
                    type: 'int',
                },
                {
                    name: 'comment_number',
                    type: 'int',
                },
                {
                    name: 'image_thumbnail',
                    type: 'varchar',
                },
                {
                    name: 'is_trending',
                    type: 'boolean',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('posts', new typeorm_1.TableForeignKey({
            columnNames: ['author_user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE posts`);
    }
}
exports.V004AddPostsTable1673088217710 = V004AddPostsTable1673088217710;
//# sourceMappingURL=V0_04__add_posts_table.js.map