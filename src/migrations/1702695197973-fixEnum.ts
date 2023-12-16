import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixEnum1702695197973 implements MigrationInterface {
  name = 'FixEnum1702695197973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` ADD \`create_author\` enum ('user', 'admin') NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` ADD \`update_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('user', 'admin') NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` varchar(255) NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` DROP COLUMN \`create_author\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` DROP COLUMN \`update_date\``,
    );
  }
}
