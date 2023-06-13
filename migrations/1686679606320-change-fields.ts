import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFields1686679606320 implements MigrationInterface {
    name = 'ChangeFields1686679606320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP FOREIGN KEY \`FK_11b16febf6729f16fbb9482cc33\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP FOREIGN KEY \`FK_abce772d0789b754c8ffe66f895\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP FOREIGN KEY \`FK_b024753501706431a9741928be4\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP COLUMN \`loteIdId\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP COLUMN \`cycleIdId\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP COLUMN \`cropIdId\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD \`lotId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD \`cycleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD \`cropId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD CONSTRAINT \`FK_b6a7851fab20ead61ef97764240\` FOREIGN KEY (\`lotId\`) REFERENCES \`lots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD CONSTRAINT \`FK_4104a4a5d3aa9670fd17363d16d\` FOREIGN KEY (\`cycleId\`) REFERENCES \`cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD CONSTRAINT \`FK_2af18a4f3abc4df49855174c38e\` FOREIGN KEY (\`cropId\`) REFERENCES \`crops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP FOREIGN KEY \`FK_2af18a4f3abc4df49855174c38e\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP FOREIGN KEY \`FK_4104a4a5d3aa9670fd17363d16d\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP FOREIGN KEY \`FK_b6a7851fab20ead61ef97764240\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP COLUMN \`cropId\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP COLUMN \`cycleId\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` DROP COLUMN \`lotId\``);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD \`cropIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD \`cycleIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD \`loteIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD CONSTRAINT \`FK_b024753501706431a9741928be4\` FOREIGN KEY (\`cycleIdId\`) REFERENCES \`cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD CONSTRAINT \`FK_abce772d0789b754c8ffe66f895\` FOREIGN KEY (\`loteIdId\`) REFERENCES \`lots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lot_cycles\` ADD CONSTRAINT \`FK_11b16febf6729f16fbb9482cc33\` FOREIGN KEY (\`cropIdId\`) REFERENCES \`crops\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
