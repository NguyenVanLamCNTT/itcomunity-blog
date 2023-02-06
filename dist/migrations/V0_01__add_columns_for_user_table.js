"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V001AddColumnsForUserTable1673080974472 = void 0;
const typeorm_1 = require("typeorm");
class V001AddColumnsForUserTable1673080974472 {
    constructor() {
        this.name = 'V001AddColumnsForUserTable1673080974472';
    }
    async up(queryRunner) {
        await queryRunner.addColumns('user', [
            new typeorm_1.TableColumn({
                name: 'last_login',
                type: 'timestamp',
                isNullable: true,
            }),
            new typeorm_1.TableColumn({
                name: 'followers_number',
                type: 'int',
                default: 0,
            }),
            new typeorm_1.TableColumn({
                name: 'posts_number',
                type: 'int',
                default: 0,
            }),
            new typeorm_1.TableColumn({
                name: 'likes_number',
                type: 'int',
                default: 0,
            }),
            new typeorm_1.TableColumn({
                name: 'is_deleted',
                type: 'boolean',
                default: false,
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns('user', [
            'last_login',
            'followers_number',
            'posts_number',
            'likes_number',
            'is_deleted',
        ]);
    }
}
exports.V001AddColumnsForUserTable1673080974472 = V001AddColumnsForUserTable1673080974472;
//# sourceMappingURL=V0_01__add_columns_for_user_table.js.map