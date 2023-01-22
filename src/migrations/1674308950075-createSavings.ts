import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSavings1674308950075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'saving',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('saving');
  }
}
