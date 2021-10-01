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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var AuthData_1 = require("../Data/AuthData");
var AuthLogic_1 = require("../logic/AuthLogic");
exports.userRouter = express_1.default.Router();
var authLogic = new AuthLogic_1.AuthLogic(new AuthData_1.AuthData());
exports.userRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, typeorm_1.getRepository)(User_1.User).find()];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).send(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var regUser, resp, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                regUser = req.body;
                return [4 /*yield*/, authLogic.Register(regUser)];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(500).send(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, resp, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.body;
                return [4 /*yield*/, authLogic.Login(user)];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).send(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.get("/verify", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Token, resp, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                Token = req.header("X-JWT-Token");
                return [4 /*yield*/, authLogic.Verify(Token)];
            case 1:
                resp = _a.sent();
                res.status(200).json(resp);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(500).send(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=UserRouter.js.map