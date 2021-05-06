"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(server, opts, next) {
    function sendSMS(phone, otp) {
        const smsPromise = new Promise((resolve, reject) => {
            var request = require("request");
            var options = {
                method: "POST",
                url: `${process.env.SMS_GATEWAY_URL}/GatewayAPI/rest`,
                form: {
                    method: "sendMessage",
                    send_to: phone,
                    msg: "Dear Customer, Your OTP to log in to the Oxyease Portal is " + otp,
                    msg_type: "TEXT",
                    userid: process.env.SMS_GATEWAY_USERID,
                    auth_scheme: "PLAIN",
                    password: process.env.SMS_GATEWAY_PASSWORD,
                    format: "JSON",
                },
            };
            request(options, function (error, response, body) {
                if (error)
                    throw new Error(error);
                console.log(body);
            });
        });
    }
    return { sendSMS };
}
exports.default = default_1;
//# sourceMappingURL=sms.js.map