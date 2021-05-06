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
function default_1(server, opts, next) {
    const generateResponse = (distributorMobile) => __awaiter(this, void 0, void 0, function* () {
        const profilePromise = new Promise((resolve, reject) => {
            var request = require('request');
            var options = {
                'method': 'POST',
                //  'url': 'https://crmbo.indusviva.com/api/crm_api_profile_voip',
                'url': process.env.BO_API_PROFILE_BY_MOIBLE,
                'headers': {},
                formData: {
                    'mobile': distributorMobile,
                    // 'key': 'uZpsyVk4yc'
                    'key': process.env.BO_API_KEY,
                }
            };
            console.log("req.prams", server.query);
            request(options, function (error, response) {
                if (error)
                    throw new Error(error);
                console.log(response.body);
                //store the API access, in API access history
                // TODO
                //
                resolve(response.body);
            });
        });
        return profilePromise;
    });
    ///generic API calling based on Distributor ID
    const generateResponsev2 = (distributorID, url) => __awaiter(this, void 0, void 0, function* () {
        const profilePromise = new Promise((resolve, reject) => {
            var request = require('request');
            var options = {
                'method': 'POST',
                'url': url,
                'headers': {},
                formData: {
                    'distid': distributorID,
                    // 'key': 'uZpsyVk4yc'
                    'key': process.env.BO_API_KEY,
                }
            };
            console.log("req.prams", server.query);
            request(options, function (error, response) {
                if (error)
                    throw new Error(error);
                console.log(response.body);
                //store the API access, in API access history
                // TODO
                //
                resolve(response.body);
            });
        });
        return profilePromise;
    });
    //generic API, with distributorID only
    const generateResponsev3 = (url) => __awaiter(this, void 0, void 0, function* () {
        const profilePromise = new Promise((resolve, reject) => {
            var request = require('request');
            var options = {
                'method': 'POST',
                'url': url,
                'headers': {},
                formData: {
                    // 'key': 'uZpsyVk4yc'
                    'key': process.env.BO_API_KEY,
                }
            };
            console.log("req.prams", server.query);
            request(options, function (error, response) {
                if (error)
                    throw new Error(error);
                console.log(response.body);
                //store the API access, in API access history
                // TODO
                //
                resolve(response.body);
            });
        });
        return profilePromise;
    });
    //generic API calling based on Distributor ID & week Number
    const generateResponsev4 = (distributorID, weekNo, url) => __awaiter(this, void 0, void 0, function* () {
        const profilePromise = new Promise((resolve, reject) => {
            var request = require('request');
            var options = {
                'method': 'POST',
                'url': url,
                'headers': {},
                formData: {
                    'distid': distributorID,
                    // 'key': 'uZpsyVk4yc'
                    'key': process.env.BO_API_KEY,
                    'week': weekNo,
                }
            };
            console.log("req.prams", server.query);
            request(options, function (error, response) {
                if (error)
                    throw new Error(error);
                console.log(response.body);
                //store the API access, in API access history
                // TODO
                //
                resolve(response.body);
            });
        });
        return profilePromise;
    });
    return { generateResponse, generateResponsev2, generateResponsev3, generateResponsev4 };
}
exports.default = default_1;
//# sourceMappingURL=BOAPIgateway.js.map