import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingLotTable1686588283719 implements MigrationInterface {
    name = 'CreatingLotTable1686588283719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`type\` enum ('LOT', 'DEPARTMENT') NOT NULL DEFAULT 'LOT', UNIQUE INDEX \`IDX_ae47285f9d524bbea728c58335\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ae47285f9d524bbea728c58335\` ON \`lots\``);
        await queryRunner.query(`DROP TABLE \`lots\``);
    }

}
