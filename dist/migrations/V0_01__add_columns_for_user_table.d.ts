import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V001AddColumnsForUserTable1673080974472 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
