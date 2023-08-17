"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const typeorm_1 = require("typeorm");
const baseConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'Ywc1989@@',
    database: 'nest-todo',
};
exports.ormConfig = {
    ...baseConfig,
    entities: ['dist/**/entity/*.entity{.js,.ts}'],
    migrations: ['dist/src/migrations/*{.js,.ts}'],
    subscribers: ['dist/src/subscribers/*{.js,.ts}'],
};
const ormConfigForCli = {
    ...baseConfig,
    entities: ['src/**/entity/*.entity{.js,.ts}'],
    migrations: ['src/migrations/*{.js,.ts}'],
    subscribers: ['src/subscribers/*{.js,.ts}'],
};
const dataSource = new typeorm_1.DataSource(ormConfigForCli);
exports.default = dataSource;
//# sourceMappingURL=database.config.js.map