import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToMagneticChain1702708124010 implements MigrationInterface {
  name = 'AddUserToMagneticChain1702708124010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` ADD CONSTRAINT \`FK_2965b879e58c31c7f33b996c302\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`magnetic_chain\` DROP FOREIGN KEY \`FK_2965b879e58c31c7f33b996c302\``,
    );
  }
}
