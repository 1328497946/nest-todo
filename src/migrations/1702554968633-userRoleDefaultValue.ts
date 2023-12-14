import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleDefaultValue1702554968633 implements MigrationInterface {
  name = 'UserRoleDefaultValue1702554968633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NULL`,
    );
  }
}
