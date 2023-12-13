import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserRoleEnum1702476784821 implements MigrationInterface {
  name = 'AlterUserRoleEnum1702476784821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`age\` int NULL, \`create_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`access_token\` varchar(255) NULL, \`refresh_token\` varchar(255) NULL, \`role\` varchar(255) NULL, UNIQUE INDEX \`IDX_3fe76ecf0f0ef036ff981e9f67\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_3fe76ecf0f0ef036ff981e9f67\` ON \`user_entity\``,
    );
    await queryRunner.query(`DROP TABLE \`user_entity\``);
  }
}
