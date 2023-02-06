import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class V003AddSeriesTable1673087685523 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
