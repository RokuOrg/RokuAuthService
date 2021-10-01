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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLogic = void 0;
var uuid_1 = require("uuid");
var Message_1 = require("../models/Message");
var JWTLogic_1 = require("./JWTLogic");
var secret_key = "YWJjZGVmZ2hpamtsbW5vcHE=";
var authData;
var AuthLogic = /** @class */ (function () {
    function AuthLogic(_authData) {
        authData = _authData;
    }
    AuthLogic.prototype.Register = function (regUser) {
        return __awaiter(this, void 0, void 0, function () {
            var testUser, guid, user, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authData.GetByEmailOrName(regUser.name, regUser.email)];
                    case 1:
                        testUser = _a.sent();
                        if (testUser != null) {
                            if (testUser.name == regUser.name)
                                return [2 /*return*/, new Message_1.Message(false, { error: "username already in use", id: 2 })];
                            return [2 /*return*/, new Message_1.Message(false, { error: "email already in use", id: 3 })];
                        }
                        guid = (0, uuid_1.v4)();
                        user = {
                            id: guid,
                            name: regUser.name,
                            email: regUser.email,
                            password: regUser.password,
                        };
                        return [4 /*yield*/, authData.SaveUser(user)];
                    case 2:
                        _a.sent();
                        session = (0, JWTLogic_1.encodeSession)(secret_key, {
                            userId: user.id,
                            dateCreated: Date.now()
                        });
                        return [2 /*return*/, new Message_1.Message(true, { token: session.token, username: user.name })];
                }
            });
        });
    };
    AuthLogic.prototype.Login = function (loginUser) {
        return __awaiter(this, void 0, void 0, function () {
            var testUser, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authData.GetByEmailOrName(loginUser.name, loginUser.name)];
                    case 1:
                        testUser = _a.sent();
                        if (testUser == null)
                            return [2 /*return*/, new Message_1.Message(false, { error: "invalid username or email", id: 2 })];
                        if (loginUser.password != testUser.password)
                            return [2 /*return*/, new Message_1.Message(false, { error: "incorrect password", id: 1 })];
                        session = (0, JWTLogic_1.encodeSession)(secret_key, {
                            userId: testUser.id,
                            dateCreated: Date.now()
                        });
                        return [2 /*return*/, new Message_1.Message(true, { token: session.token, username: testUser.name })];
                }
            });
        });
    };
    AuthLogic.prototype.Verify = function (Token) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedSession, userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decodedSession = (0, JWTLogic_1.decodeSession)(secret_key, Token);
                        if (decodedSession.type !== "invalid-token") {
                            if (decodedSession.type !== "integrity-error") {
                                userId = decodedSession.session.userId;
                            }
                        }
                        return [4 /*yield*/, authData.GetById(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new Message_1.Message(true, { username: user.name })];
                }
            });
        });
    };
    return AuthLogic;
}());
exports.AuthLogic = AuthLogic;
//# sourceMappingURL=AuthLogic.js.map