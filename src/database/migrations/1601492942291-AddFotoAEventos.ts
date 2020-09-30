import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFotoAEventos1601492942291
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'eventos',
            new TableColumn({
                name: 'photo',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('eventos', 'photo');
    }
}
