import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createUsers1673196644537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'character varying',
            length: '255',
            isNullable: false,
          },
        ],
      }),
    );

    return queryRunner.createIndex(
      'user',
      new TableIndex({ columnNames: ['email'], isUnique: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('user');
  }
}
