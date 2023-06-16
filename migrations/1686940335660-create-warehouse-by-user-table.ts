import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWarehouseByUserTable1686940335660 implements MigrationInterface {
    name = 'CreateWarehouseByUserTable1686940335660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`warehouse_by_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`Update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`warehouseId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_9a0c7f582a9bad93b0c88c8a6f\` (\`warehouseId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`warehouse_by_user\` ADD CONSTRAINT \`FK_794835ba5c003680fa148da3547\` FOREIGN KEY (\`warehouseId\`) REFERENCES \`warehouses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`warehouse_by_user\` ADD CONSTRAINT \`FK_e050a36f3da3a1ba1d26e89b7a4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`warehouse_by_user\` DROP FOREIGN KEY \`FK_e050a36f3da3a1ba1d26e89b7a4\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_by_user\` DROP FOREIGN KEY \`FK_794835ba5c003680fa148da3547\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a0c7f582a9bad93b0c88c8a6f\` ON \`warehouse_by_user\``);
        await queryRunner.query(`DROP TABLE \`warehouse_by_user\``);
    }

}
