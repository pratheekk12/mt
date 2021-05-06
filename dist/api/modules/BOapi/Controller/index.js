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
//all theAPI codes are here for this plugin
// only request object & reply objects will be here
// business logic is in service
const fastify_plugin_1 = require("fastify-plugin");
exports.default = fastify_plugin_1.default((server, opts, next) => __awaiter(void 0, void 0, void 0, function* () {
    server.route({
        url: "/boapi",
        logLevel: "warn",
        method: ["GET"],
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.getAllApiCalls();
                reply.code(200);
                reply.send({ apiCalls });
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //route for getting profile details with Mobile#
    server.route({
        url: "/boapi/profile",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['mobilenumber'],
                additionalProperties: false,
                properties: {
                    mobilenumber: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                //  const apiCalls = await server.boapiService.generateResponse('9935413775');
                const apiCalls = yield server.boapiService.generateResponse(request.query.mobilenumber);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //API for getting Distributor Profile by ID
    server.route({
        url: "/boapi/profileID",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_PROFILE_BY_ID);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //API for getting recent Orders of a distributor
    // input DistributorID; output JSON
    server.route({
        url: "/boapi/orders",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_ORDER_STATUS);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //invoice status of a distributor
    //
    server.route({
        url: "/boapi/invoice",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_INVOICE_STATUS);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //KYC Status
    server.route({
        url: "/boapi/kycstatus",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_KYC_STATUS);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //
    //VTOM INVOICES
    //
    server.route({
        url: "/boapi/vtomstatus",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_VTOM_INVOICES);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //
    // Distributor Joining
    //
    server.route({
        url: "/boapi/distjoining",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponse(request.query.distributorID, process.env.BO_API_DISTRIBUTOR_JOINING);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //
    // Distributor Joining
    //
    server.route({
        url: "/boapi/distsponsored",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_DISTRIBUTOR_SPONSORED);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //
    // Rank advancement
    //
    server.route({
        url: "/boapi/rank",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_RANK_ADVANCEMENT);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //API FOR REASON FOR REJECTION
    server.route({
        url: "/boapi/rejectreason",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_REASON_FOR_REJECTION);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //API FOR REASON FOR GETTING COMISSION INFORMATION OF A DISTRIBUTOR
    server.route({
        url: "/boapi/comission",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID', 'weeknumber'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    },
                    weeknumber: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev4(request.query.distributorID, request.query.weeknumber, process.env.BO_API_COMISSION);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //get deduction list for adistributor
    //process.env.BO_API_DEDUCTION_LIST
    //
    server.route({
        url: "/boapi/deductions",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_DEDUCTION_LIST);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    ///GET vmail
    ///process.env.BO_API_GET_VMAIL
    //
    server.route({
        url: "/boapi/getvmail",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API_GET_VMAIL);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //VMAIL TICKET STATUS
    //process.env.BO_API__GET_VAMIL_TICKET
    //
    server.route({
        url: "/boapi/getvmailticket",
        logLevel: "warn",
        method: ["GET"],
        schema: {
            querystring: {
                type: 'object',
                required: ['distributorID'],
                additionalProperties: false,
                properties: {
                    distributorID: {
                        type: 'string',
                    }
                }
            },
        },
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev2(request.query.distributorID, process.env.BO_API__GET_VAMIL_TICKET);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    //VMAIL SUBJECTS
    //process.env.BO_API__GET_VAMIL_SUBJECT='https://crmbo.indusviva.com/api/crm_api_subject_master';
    //
    server.route({
        url: "/boapi/vmailsubjectmaster",
        logLevel: "warn",
        method: ["GET"],
        //preHandler: server.auth([server.verifyAuthService.verifyAdminRole]),
        // preHandler: server.auth([
        //   //server.verifyAuthService.verifyLogin,
        //   //fastify.asyncVerifyUserAndPassword
        // ]),
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const apiCalls = yield server.boapiService.generateResponsev3(process.env.BO_API__GET_VAMIL_SUBJECT);
                reply.code(200);
                reply.send(apiCalls);
            }
            catch (err) {
                console.log(err);
                reply.code(503);
                reply.send({ message: "Service not available" });
            }
        }),
    });
    next();
}));
//# sourceMappingURL=index.js.map