"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V005AddSeriesPostsTable1673088835395 = void 0;
const typeorm_1 = require("typeorm");
class V005AddSeriesPostsTable1673088835395 {
    constructor() {
        this.name = 'V005AddSeriesPostsTable1673088835395';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'series_posts',
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
                    name: 'series_id',
                    type: 'int',
                },
                {
                    name: 'posts_id',
                    type: 'int',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('series_posts', new typeorm_1.TableForeignKey({
            columnNames: ['series_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'series',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('series_posts', new typeorm_1.TableForeignKey({
            columnNames: ['posts_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'posts',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE series_posts`);
    }
}
exports.V005AddSeriesPostsTable1673088835395 = V005AddSeriesPostsTable1673088835395;
//# sourceMappingURL=V0_05__add_series_posts_table.js.map