import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMagneticChain1702653276518 implements MigrationInterface {
  name = 'AddMagneticChain1702653276518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`magnetic_chain\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL, \`hash\` varchar(255) NOT NULL, \`crate_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7758df4a3a9844d010d11d7b40\` (\`link\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_7758df4a3a9844d010d11d7b40\` ON \`magnetic_chain\``,
    );
    await queryRunner.query(`DROP TABLE \`magnetic_chain\``);
  }
}
