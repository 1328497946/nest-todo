import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserRole1702474581504 implements MigrationInterface {
  name = 'AlterUserRole1702474581504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
  }
}
