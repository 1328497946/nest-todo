import { MigrationInterface, QueryRunner } from 'typeorm';

export class User添加accessToken1698818809077 implements MigrationInterface {
  name = 'User添加accessToken1698818809077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`access_token\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`access_token\``,
    );
  }
}
