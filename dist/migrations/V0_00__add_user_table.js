"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V000AddUserTable1672577822902 = void 0;
const typeorm_1 = require("typeorm");
class V000AddUserTable1672577822902 {
    constructor() {
        this.name = 'V000AddUserTable1672577822902';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generatedIdentity: 'BY DEFAULT',
                    isGenerated: true,
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
                    name: 'full_name',
                    type: 'varchar',
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'age',
                    type: 'int',
                },
                {
                    name: 'gender',
                    type: 'varchar',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE user`);
    }
}
exports.V000AddUserTable1672577822902 = V000AddUserTable1672577822902;
//# sourceMappingURL=V0_00__add_user_table.js.map