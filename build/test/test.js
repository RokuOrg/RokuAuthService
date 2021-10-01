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
var AuthLogic_1 = require("../logic/AuthLogic");
var FakeAuthData_1 = require("../Data/FakeAuthData");
var assert = require('assert');
var authData = new FakeAuthData_1.FakeAuthData();
var authLogic = new AuthLogic_1.AuthLogic(authData);
var user = {
    id: "1",
    name: "2",
    email: "3",
    password: "4"
};
describe('Test Auth Logic', function () {
    before(function () {
        authData.SaveUser(user);
    });
    describe("Login Tests", function () {
        describe('Login Success', function () {
            it('Should return a success true and a token', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var loginUser, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loginUser = {
                                    name: user.name,
                                    password: user.password
                                };
                                return [4 /*yield*/, authLogic.Login(loginUser).then(function (x) {
                                        res = x;
                                    })];
                            case 1:
                                _a.sent();
                                assert.equal(res.succes, true);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('login fail wrong password', function () {
            it('should return success false and wrong password error', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var loginUser, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loginUser = {
                                    name: user.name,
                                    password: "wrong password"
                                };
                                return [4 /*yield*/, authLogic.Login(loginUser).then(function (x) {
                                        res = x;
                                    })];
                            case 1:
                                _a.sent();
                                assert.equal(res.succes, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('login fail wrong name', function () {
            it('should return success false and wrong name error', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var loginUser, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loginUser = {
                                    name: "wrong name",
                                    password: user.password
                                };
                                return [4 /*yield*/, authLogic.Login(loginUser).then(function (x) {
                                        res = x;
                                    })];
                            case 1:
                                _a.sent();
                                assert.equal(res.succes, false);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
    });
    describe("Register Tests", function () {
        describe('Register Success', function () {
            it('Should return a success true and a token', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var registerUser, res, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                registerUser = {
                                    name: "user",
                                    email: "user@example.com",
                                    password: "user123",
                                };
                                return [4 /*yield*/, authLogic.Register(registerUser).then(function (x) {
                                        res = x;
                                    })];
                            case 1:
                                _a.sent();
                                if (!res.succes)
                                    assert.fail(res.object);
                                return [4 /*yield*/, authData.GetByEmailOrName(registerUser.name, registerUser.email)];
                            case 2:
                                user = _a.sent();
                                assert(user != null);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe("Register Fail Name Used", function () {
            it('Should return a success false and name error', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var registerUser, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                registerUser = {
                                    name: "2",
                                    email: "user@example.com",
                                    password: "user123",
                                };
                                return [4 /*yield*/, authLogic.Register(registerUser).then(function (x) {
                                        res = x;
                                    })];
                            case 1:
                                _a.sent();
                                assert(!res.succes);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe("Register Fail Email Used", function () {
            it('Should return a success false and email error', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var registerUser, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                registerUser = {
                                    name: "abcdef",
                                    email: "3",
                                    password: "user123",
                                };
                                return [4 /*yield*/, authLogic.Register(registerUser).then(function (x) {
                                        res = x;
                                    })];
                            case 1:
                                _a.sent();
                                assert(!res.succes);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=test.js.map