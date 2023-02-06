import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V006AddColumnForUserTable1675263567072 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
