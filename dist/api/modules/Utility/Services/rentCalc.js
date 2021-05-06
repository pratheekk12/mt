"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculatePrice(rent, quant, finalPrice) {
    if (quant >= 30) {
        finalPrice += +rent.monthlyPrice * Math.floor(quant / 30);
        quant = quant % 30;
    }
    else if (quant >= 7) {
        finalPrice += +rent.weeklyPrice * Math.floor(quant / 7);
        quant = quant % 7;
    }
    else if (quant >= 1) {
        finalPrice += +rent.dailyPrice * quant;
        quant = 0;
    }
    else {
        return finalPrice;
    }
    return calculatePrice(rent, quant, finalPrice);
}
exports.default = calculatePrice;
//# sourceMappingURL=rentCalc.js.map