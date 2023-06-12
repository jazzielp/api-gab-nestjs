import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCrops1686357578316 implements MigrationInterface {
    name = 'CreateTableCrops1686357578316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`crops\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`isCrop\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_33e6399d4c7cedd12806d5d4dd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_33e6399d4c7cedd12806d5d4dd\` ON \`crops\``);
        await queryRunner.query(`DROP TABLE \`crops\``);
    }

}
