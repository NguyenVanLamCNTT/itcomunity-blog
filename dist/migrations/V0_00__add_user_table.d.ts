import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V000AddUserTable1672577822902 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
