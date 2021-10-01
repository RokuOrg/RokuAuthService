"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthData = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var AuthData = /** @class */ (function () {
    function AuthData() {
    }
    AuthData.prototype.GetByEmailOrName = function (name, email) {
        return (0, typeorm_1.getRepository)(User_1.User).findOne({ where: [{ email: name }, { name: email }] });
    };
    AuthData.prototype.SaveUser = function (user) {
        (0, typeorm_1.getRepository)(User_1.User).save(user);
        return;
    };
    AuthData.prototype.GetById = function (Id) {
        return (0, typeorm_1.getRepository)(User_1.User).findOne({ where: { id: Id } });
    };
    return AuthData;
}());
exports.AuthData = AuthData;
//# sourceMappingURL=AuthData.js.map