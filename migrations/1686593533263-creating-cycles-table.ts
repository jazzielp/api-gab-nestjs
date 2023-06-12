import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingCyclesTable1686593533263 implements MigrationInterface {
    name = 'CreatingCyclesTable1686593533263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cycles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cycle\` varchar(10) NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_cf75c08d22179fdb963060e2d3\` (\`cycle\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cf75c08d22179fdb963060e2d3\` ON \`cycles\``);
        await queryRunner.query(`DROP TABLE \`cycles\``);
    }

}
