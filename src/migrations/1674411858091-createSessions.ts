import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class createSessions1674411858091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('session');
  }
}
