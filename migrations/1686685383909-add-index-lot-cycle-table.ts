import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexLotCycleTable1686685383909 implements MigrationInterface {
  name = 'AddIndexLotCycleTable1686685383909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_5d596e52a4d1debea3ad405a40\` ON \`lot_cycles\` (\`lotId\`, \`cycleId\`, \`cropId\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_5d596e52a4d1debea3ad405a40\` ON \`lot_cycles\``,
    );
  }
}
