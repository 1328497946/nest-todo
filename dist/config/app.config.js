"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("./database.config");
exports.default = () => ({
    port: 3000,
    environment: 'development',
    database: database_config_1.ormConfig,
});
//# sourceMappingURL=app.config.js.map