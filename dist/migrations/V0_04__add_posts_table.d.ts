import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V004AddPostsTable1673088217710 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
