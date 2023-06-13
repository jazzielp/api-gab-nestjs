import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLotcycleTable1686676870370 implements MigrationInterface {
  name = 'UpdateLotcycleTable1686676870370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cycles\` DROP FOREIGN KEY \`FK_70f2190b1425ccb26e71f8669c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`crops\` DROP FOREIGN KEY \`FK_173472feb69a46e0623d16fbbb7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`lots\` DROP FOREIGN KEY \`FK_093ba65ea54987ed3d0292f6ba6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cycles\` DROP COLUMN \`lotCyclesId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`crops\` DROP COLUMN \`lotCyclesId\``,
    );
    await queryRunner.query(`ALTER TABLE \`lots\` DROP COLUMN \`lotCyclesId\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lots\` ADD \`lotCyclesId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`crops\` ADD \`lotCyclesId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cycles\` ADD \`lotCyclesId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lots\` ADD CONSTRAINT \`FK_093ba65ea54987ed3d0292f6ba6\` FOREIGN KEY (\`lotCyclesId\`) REFERENCES \`lot_cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`crops\` ADD CONSTRAINT \`FK_173472feb69a46e0623d16fbbb7\` FOREIGN KEY (\`lotCyclesId\`) REFERENCES \`lot_cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cycles\` ADD CONSTRAINT \`FK_70f2190b1425ccb26e71f8669c1\` FOREIGN KEY (\`lotCyclesId\`) REFERENCES \`lot_cycles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
