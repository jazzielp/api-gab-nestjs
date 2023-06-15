import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompanyByUserTable1686866921216
  implements MigrationInterface
{
  name = 'CreateCompanyByUserTable1686866921216';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company_by_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`companyId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_231cca86e28d2af020fbdca49c\` (\`companyId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_by_user\` ADD CONSTRAINT \`FK_55da7a7028d010c3a6d4bb060e0\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_by_user\` ADD CONSTRAINT \`FK_9d6b055a353834a119338f41ab4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_by_user\` DROP FOREIGN KEY \`FK_9d6b055a353834a119338f41ab4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_by_user\` DROP FOREIGN KEY \`FK_55da7a7028d010c3a6d4bb060e0\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_231cca86e28d2af020fbdca49c\` ON \`company_by_user\``,
    );
    await queryRunner.query(`DROP TABLE \`company_by_user\``);
  }
}
