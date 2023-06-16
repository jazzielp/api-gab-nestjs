import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBranchByUserTable1686937660187 implements MigrationInterface {
    name = 'CreateBranchByUserTable1686937660187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`branch_by_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`branchId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_8f8485e88e1c0c71d0120c2487\` (\`branchId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`branch_by_user\` ADD CONSTRAINT \`FK_275121c77c12f550781f566838c\` FOREIGN KEY (\`branchId\`) REFERENCES \`branches\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branch_by_user\` ADD CONSTRAINT \`FK_118df1eedfc1ab6e12cd3ce1b23\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branch_by_user\` DROP FOREIGN KEY \`FK_118df1eedfc1ab6e12cd3ce1b23\``);
        await queryRunner.query(`ALTER TABLE \`branch_by_user\` DROP FOREIGN KEY \`FK_275121c77c12f550781f566838c\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f8485e88e1c0c71d0120c2487\` ON \`branch_by_user\``);
        await queryRunner.query(`DROP TABLE \`branch_by_user\``);
    }

}
