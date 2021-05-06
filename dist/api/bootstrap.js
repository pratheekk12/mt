"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const connector_1 = require("./db/config/connector");
const mysqlConnector_1 = require("./db/config/mysqlConnector");
const BOapi_1 = require("./modules/BOapi");
exports.default = fastify_plugin_1.default((server, opts, next) => {
    server
        .register(connector_1.default, {
        uri: server.envConfig.MONGO_URI,
    });
    server.register(mysqlConnector_1.default, {
        dialect: "mysql",
        host: server.envConfig.MYSQL_HOST,
        port: server.envConfig.MYSQL_PORT,
        username: server.envConfig.MYSQL_USER,
        password: server.envConfig.MYSQL_PASS,
        database: server.envConfig.MYSQL_DATABASE,
        dialectOptions: {
            requestTimeout: 10000,
        },
    });
    // .register(utilPlugin)
    //.register(appCache)
    //.register(authPlugin)
    //.register(userAuthPlugin)
    // .register(telephonyPlugin)
    server.register(BOapi_1.default);
    next();
});
//# sourceMappingURL=bootstrap.js.map