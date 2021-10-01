"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpirationStatus = exports.decodeSession = exports.encodeSession = void 0;
var jwt_simple_1 = require("jwt-simple");
function encodeSession(secretKey, partialSession) {
    var algorithm = "HS512";
    var issued = Date.now();
    var expires = issued + 15 * 60 * 1000;
    var session = __assign(__assign({}, partialSession), { issued: issued, expires: expires });
    return {
        token: (0, jwt_simple_1.encode)(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}
exports.encodeSession = encodeSession;
function decodeSession(secretKey, tokenString) {
    var algorithm = "HS512";
    var result;
    try {
        result = (0, jwt_simple_1.decode)(tokenString, secretKey, false, algorithm);
    }
    catch (_e) {
        var e = _e;
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }
        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }
        throw e;
    }
    return {
        type: "valid",
        session: result
    };
}
exports.decodeSession = decodeSession;
function checkExpirationStatus(token) {
    var now = Date.now();
    if (token.expires > now)
        return "active";
    var threeHoursAfterExpiration = token.expires + 3 * 60 * 60 * 1000;
    if (threeHoursAfterExpiration > now)
        return "grace";
    return "expired";
}
exports.checkExpirationStatus = checkExpirationStatus;
//# sourceMappingURL=JWTLogic.js.map