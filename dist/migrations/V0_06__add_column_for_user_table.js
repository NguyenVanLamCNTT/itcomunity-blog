"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V006AddColumnForUserTable1675263567072 = void 0;
const typeorm_1 = require("typeorm");
class V006AddColumnForUserTable1675263567072 {
    constructor() {
        this.name = 'V006AddColumnsForUserTable1675263567072';
    }
    async up(queryRunner) {
        await queryRunner.addColumns('user', [
            new typeorm_1.TableColumn({
                name: 'is_confirm_email',
                type: 'boolean',
                isNullable: true,
                default: false,
            }),
            new typeorm_1.TableColumn({
                name: 'is_admin',
                type: 'boolean',
                isNullable: true,
                default: false,
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns('user', ['is_confirm_email', 'is_admin']);
    }
}
exports.V006AddColumnForUserTable1675263567072 = V006AddColumnForUserTable1675263567072;
//# sourceMappingURL=V0_06__add_column_for_user_table.js.map