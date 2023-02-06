"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V002AddAuthorFollowersTable1673084226574 = void 0;
const typeorm_1 = require("typeorm");
class V002AddAuthorFollowersTable1673084226574 {
    constructor() {
        this.name = 'V002AddAuthorFollowersTable1673084226574';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'author_followers',
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
                    name: 'author_user_id',
                    type: 'int',
                },
                {
                    name: 'followers_user_id',
                    type: 'int',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('author_followers', new typeorm_1.TableForeignKey({
            columnNames: ['author_user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('author_followers', new typeorm_1.TableForeignKey({
            columnNames: ['followers_user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE author_followers`);
    }
}
exports.V002AddAuthorFollowersTable1673084226574 = V002AddAuthorFollowersTable1673084226574;
//# sourceMappingURL=V0_02__add_author_followers_table.js.map