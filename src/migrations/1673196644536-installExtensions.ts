import { MigrationInterface, QueryRunner } from 'typeorm';

export class installExtensions1673196644536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
  }
}
