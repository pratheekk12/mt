"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    confKey: "envConfig",
    schema: {
        type: "object",
        required: ["HOST", "PORT", "MYSQL_PORT", "MYSQL_HOST", "MYSQL_USER", "MYSQL_PASS", "MYSQL_DATABASE", "MONGO_URI"],
        properties: {
            PORT: { type: "string" },
            HOST: { type: "string" },
            MYSQL_HOST: {
                type: "string",
            },
            MYSQL_PORT: {
                type: "string",
            },
            MYSQL_USER: {
                type: "string",
            },
            MYSQL_PASS: {
                type: "string",
            },
            MYSQL_DATABASE: {
                type: "string",
            },
            MONGO_URI: {
                type: "string",
            }
        },
    },
    dotenv: true,
};
//# sourceMappingURL=envSchema.js.map