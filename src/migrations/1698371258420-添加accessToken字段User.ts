import { MigrationInterface, QueryRunner } from 'typeorm';

export class 添加accessToken字段User1698371258420
  implements MigrationInterface
{
  name = ' 添加accessToken字段User1698371258420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accessToken\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`accessToken\` varchar(255) NULL`,
    );
  }
}
