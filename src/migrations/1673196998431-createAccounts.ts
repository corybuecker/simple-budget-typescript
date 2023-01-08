import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAccounts1673196998431 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'character varying',
            length: '255',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'numeric',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('accounts');
  }
}
