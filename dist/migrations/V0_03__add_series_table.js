"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V003AddSeriesTable1673087685523 = void 0;
const typeorm_1 = require("typeorm");
class V003AddSeriesTable1673087685523 {
    constructor() {
        this.name = 'V003AddSeriesTable1673087685523';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'series',
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
                    name: 'description',
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
                    name: 'is_trending',
                    type: 'boolean',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('series', new typeorm_1.TableForeignKey({
            columnNames: ['author_user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE series`);
    }
}
exports.V003AddSeriesTable1673087685523 = V003AddSeriesTable1673087685523;
//# sourceMappingURL=V0_03__add_series_table.js.map