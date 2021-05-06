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
//this is definition for mongoose object
const fastify_plugin_1 = require("fastify-plugin");
const mongoose_1 = require("mongoose");
const mongoose = new mongoose_1.Mongoose();
exports.default = fastify_plugin_1.default((server, opts, next) => __awaiter(void 0, void 0, void 0, function* () {
    mongoose.connection.on("connected", () => {
        server.log.info({ actor: "MongoDB" }, "connected");
    });
    mongoose.connection.on("disconnected", () => {
        server.log.error({ actor: "MongoDB" }, "disconnected");
    });
    yield mongoose.connect(opts.uri, {
        //user:process.env.DATABASE_USERNAME,
        //pass:process.env.DATABASE_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        useFindAndModify: true
    });
    server.decorate("db", mongoose);
    next();
}));
//# sourceMappingURL=connector.js.map