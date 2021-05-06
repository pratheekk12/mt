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
//break down the business logic and group it based on operation/module level
//all modules are decorated into one service (line 11); line 7 is catalogue update.
const boAPIaccessHistory_1 = require("./boAPIaccessHistory"); //catalogue import
const BOAPIgateway_1 = require("./BOAPIgateway");
const fastify_plugin_1 = require("fastify-plugin");
exports.default = fastify_plugin_1.default((server, opts, next) => __awaiter(void 0, void 0, void 0, function* () {
    const boAPIaccessHistory = boAPIaccessHistory_1.default(server, opts, next);
    const BOAPIgateway = BOAPIgateway_1.default(server, opts, next);
    server.decorate("boapiService", Object.assign(Object.assign({}, boAPIaccessHistory), BOAPIgateway));
    next();
}));
//# sourceMappingURL=index.js.map