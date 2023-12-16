import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixConflict1702694100447 implements MigrationInterface {
  name = 'FixConflict1702694100447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` ADD \`create_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` CHANGE \`link\` \`link\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` ADD UNIQUE INDEX \`IDX_7758df4a3a9844d010d11d7b40\` (\`link\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` CHANGE \`hash\` \`hash\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` CHANGE \`hash\` \`hash\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` DROP INDEX \`IDX_7758df4a3a9844d010d11d7b40\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` CHANGE \`link\` \`link\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` CHANGE \`name\` \`name\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` DROP COLUMN \`create_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` DROP COLUMN \`id\``,
    );
  }
}
