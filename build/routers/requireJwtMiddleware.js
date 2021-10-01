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
exports.requireJwtMiddleware = void 0;
var JWTLogic_1 = require("../logic/JWTLogic");
var Secret_Key = "YWJjZGVmZ2hpamtsbW5vcHE=";
function requireJwtMiddleware(request, response, next) {
    var unauthorized = function (message) { return response.status(200).json({
        succes: false,
        message: message
    }); };
    var requestHeader = "X-JWT-Token";
    var responseHeader = "X-Renewed-JWT-Token";
    var header = request.header(requestHeader);
    if (!header) {
        unauthorized("Required " + requestHeader + " header not found.");
        return;
    }
    var decodedSession = (0, JWTLogic_1.decodeSession)(Secret_Key, header);
    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized("Failed to decode or validate authorization token. Reason: " + decodedSession.type + ".");
        return;
    }
    var expiration = (0, JWTLogic_1.checkExpirationStatus)(decodedSession.session);
    if (expiration === "expired") {
        unauthorized("Authorization token has expired. Please create a new authorization token.");
        return;
    }
    var session;
    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        var _a = (0, JWTLogic_1.encodeSession)(Secret_Key, decodedSession.session), token = _a.token, expires = _a.expires, issued = _a.issued;
        session = __assign(__assign({}, decodedSession.session), { expires: expires, issued: issued });
        response.setHeader(responseHeader, token);
    }
    else {
        session = decodedSession.session;
    }
    response.locals = __assign(__assign({}, response.locals), { session: session });
    next();
}
exports.requireJwtMiddleware = requireJwtMiddleware;
//# sourceMappingURL=requireJwtMiddleware.js.map