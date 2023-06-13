import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingLotcycleTable1686676537914 implements MigrationInterface {
    name = 'CreatingLotcycleTable1686676537914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lot_cycles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`haston\` int NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lots\` ADD \`lotCyclesId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cycles\` ADD \`lotCyclesId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`crops\` ADD \`lotCyclesId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lots\` ADD CONSTRAINT \`FK_093ba65ea54987ed3d0292f6ba6\` FOREIGN KEY (\`lotCyclesId\`) REFERENCES \`lot_cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cycles\` ADD CONSTRAINT \`FK_70f2190b1425ccb26e71f8669c1\` FOREIGN KEY (\`lotCyclesId\`) REFERENCES \`lot_cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`crops\` ADD CONSTRAINT \`FK_173472feb69a46e0623d16fbbb7\` FOREIGN KEY (\`lotCyclesId\`) REFERENCES \`lot_cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crops\` DROP FOREIGN KEY \`FK_173472feb69a46e0623d16fbbb7\``);
        await queryRunner.query(`ALTER TABLE \`cycles\` DROP FOREIGN KEY \`FK_70f2190b1425ccb26e71f8669c1\``);
        await queryRunner.query(`ALTER TABLE \`lots\` DROP FOREIGN KEY \`FK_093ba65ea54987ed3d0292f6ba6\``);
        await queryRunner.query(`ALTER TABLE \`crops\` DROP COLUMN \`lotCyclesId\``);
        await queryRunner.query(`ALTER TABLE \`cycles\` DROP COLUMN \`lotCyclesId\``);
        await queryRunner.query(`ALTER TABLE \`lots\` DROP COLUMN \`lotCyclesId\``);
        await queryRunner.query(`DROP TABLE \`lot_cycles\``);
    }

}
