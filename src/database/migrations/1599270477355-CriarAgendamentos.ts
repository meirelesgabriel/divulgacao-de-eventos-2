import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CriarAgendamentos1599270477355
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'agendamentos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid', // universal unique id
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'prestador_servico_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'data',
                        type: 'timestamp with time zone',
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
            }),
        );

        await queryRunner.createForeignKey(
            'agendamentos',
            new TableForeignKey({
                columnNames: ['prestador_servico_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usuarios',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('agendamentos');
    }
}
