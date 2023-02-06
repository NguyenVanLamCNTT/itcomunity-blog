import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V005AddSeriesPostsTable1673088835395 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
