import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddUUID1692264639883 implements MigrationInterface {
    name = 'UserAddUUID1692264639883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`user_id\` varchar(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`user_id\``);
    }

}
