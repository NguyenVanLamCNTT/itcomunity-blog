import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V002AddAuthorFollowersTable1673084226574 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
