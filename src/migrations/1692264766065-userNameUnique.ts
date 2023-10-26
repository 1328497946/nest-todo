import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNameUnique1692264766065 implements MigrationInterface {
  name = 'UserNameUnique1692264766065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\``,
    );
  }
}
