import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMagneticChain1702711658387 implements MigrationInterface {
  name = 'AddMagneticChain1702711658387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`magnetic_chain\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`tag\` varchar(255) NULL, \`hash\` varchar(255) NOT NULL, \`create_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_7758df4a3a9844d010d11d7b40\` (\`link\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('user', 'admin') NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_758b8ce7c18b9d347461b30228\` ON \`user\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` ADD CONSTRAINT \`FK_2965b879e58c31c7f33b996c302\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` DROP FOREIGN KEY \`FK_2965b879e58c31c7f33b996c302\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_758b8ce7c18b9d347461b30228\` ON \`user\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` varchar(255) NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7758df4a3a9844d010d11d7b40\` ON \`magnetic_chain\``,
    );
    await queryRunner.query(`DROP TABLE \`magnetic_chain\``);
  }
}
