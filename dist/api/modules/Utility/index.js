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
const fastify_plugin_1 = require("fastify-plugin");
const AppMetadata_1 = require("./Models/AppMetadata");
const mailer_1 = require("./Services/mailer");
const sms_1 = require("./Services/sms");
exports.default = fastify_plugin_1.default((server, opts, next) => __awaiter(void 0, void 0, void 0, function* () {
    server.db.models["AppMetadata"] = server.db.model("AppMetadata", AppMetadata_1.default);
    const mailUtil = mailer_1.default(server, opts, next);
    const smsUtil = sms_1.default(server, opts, next);
    const loggingService = null;
    server.decorate("util", Object.assign(Object.assign(Object.assign({}, mailUtil), smsUtil), loggingService));
    next();
}));
//# sourceMappingURL=index.js.map