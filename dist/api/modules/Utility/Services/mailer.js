"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../emailTemplate/template");
var nodemailer = require("nodemailer");
function default_1(server, opts, next) {
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    function sendMail(toAddress, subject, text) {
        var mailOptions = {
            from: 'no-reply@oxyease.com',
            to: toAddress,
            subject: subject,
            html: template_1.getEmailTemplateForOtp(text),
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
    }
    return { sendMail };
}
exports.default = default_1;
//# sourceMappingURL=mailer.js.map