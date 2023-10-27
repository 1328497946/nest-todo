import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshToken更改为refreshToken1698389653979
  implements MigrationInterface
{
  name = 'RefreshToken更改为refreshToken1698389653979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refresh_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refreshToken\` varchar(255) NULL`,
    );
  }
}
