import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAccounts1673196998431 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'userId',
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
          {
            name: 'debt',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('account');
  }
}
