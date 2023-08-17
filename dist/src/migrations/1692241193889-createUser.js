"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1692241193889 = void 0;
class CreateUser1692241193889 {
    constructor() {
        this.name = 'CreateUser1692241193889';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
exports.CreateUser1692241193889 = CreateUser1692241193889;
//# sourceMappingURL=1692241193889-createUser.js.map