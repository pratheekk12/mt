"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const envSchema_1 = require("./envSchema");
const fastify_1 = require("fastify");
const bootstrap_1 = require("./bootstrap");
const dotenv = require("dotenv");
const fastify_env_1 = require("fastify-env");
const path = require("path");
// Define  Swagger Options
dotenv.config();
const swagger_options = {
    routePrefix: "/documentation",
    exposeRoute: true,
    swagger: {
        info: {
            title: "Indusviva Back Office Interface APIs",
            description: "Back Office API Services",
            version: "1.0.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        // do not set the host variable; if you dont require it
        //host: '164.52.205.10:3001',
        schemes: ["http"],
        consumes: ["appplication/json"],
        produces: ["application/json"],
    },
};
//define swagger server.
const fastify_swagger = require("fastify-swagger");
//define logger
const pino = require('pino');
//const logger = pino({level: process.env.LOG_LEVEL}, path.resolve(__dirname,process.env.LOG_FILE));
const logger = pino({ level: process.env.LOG_LEVEL }, path.resolve(__dirname, process.env.LOG_FILE_LOCAL));
// Create fastify server
const server = fastify_1.default({
    logger,
});
//register Swagger
server.register(fastify_swagger, swagger_options);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(Number(server.envConfig.PORT), server.envConfig.HOST);
    }
    catch (err) {
        //process.exit(1);
        server.log.info(err);
        console.log(err);
    }
    console.log('Fastify Servicer Started at PORT=', Number(server.envConfig.PORT), 'Server IP=', server.envConfig.HOST);
});
server.register(fastify_env_1.default, envSchema_1.default).ready(() => {
    start();
});
server.register(bootstrap_1.default);
process.on("uncaughtException", (error) => {
    console.error(error);
});
process.on("unhandledRejection", (error) => {
    console.error(error);
});
//# sourceMappingURL=index.js.map