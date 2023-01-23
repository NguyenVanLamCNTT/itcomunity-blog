import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class V000AddUserTable1672577822902 implements MigrationInterface {
    name = 'V000AddUserTable1672577822902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generatedIdentity: "BY DEFAULT",
                        isGenerated: true
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
                        name: "full_name",
                        type: "varchar",
                    },
                    {
                        name: "username",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "age",
                        type: "int"
                    },
                    {
                        name: "gender",
                        type: "varchar"
                    }
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user`);
    }

}