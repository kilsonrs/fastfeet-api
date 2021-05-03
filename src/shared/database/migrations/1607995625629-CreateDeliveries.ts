import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDeliveries1607995625629
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deliveries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'deliveryman_id',
            type: 'uuid',
          },
          {
            name: 'recipient_id',
            type: 'uuid',
          },
          {
            name: 'package_name',
            type: 'varchar',
          },
          {
            name: 'signature',
            type: 'varchar',
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'end_date',
            type: 'timestamp',
          },
          {
            name: 'canceled_at',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKDeliverymanUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['deliveryman_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKRecipient',
            referencedTableName: 'recipients',
            referencedColumnNames: ['id'],
            columnNames: ['recipient_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deliveries');
  }
}
