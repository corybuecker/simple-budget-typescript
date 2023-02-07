import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
export class createSessions1674411858091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session',
        columns: [
          {
            name: 'id',
            type: 'character varying',
            length: '255',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'expiredAt',
            type: 'bigint',
            isNullable: false,
          },

          {
            name: 'json',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'destroyedAt',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
    );
    return queryRunner.createIndex(
      'session',
      new TableIndex({ columnNames: ['expiredAt'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('session');
  }
}
