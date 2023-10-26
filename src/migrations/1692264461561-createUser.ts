import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1692264461561 implements MigrationInterface {
  name = 'CreateUser1692264461561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`age\` int NULL, \`create_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
