"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeAuthData = void 0;
var Users = [];
var FakeAuthData = /** @class */ (function () {
    function FakeAuthData() {
    }
    FakeAuthData.prototype.GetByEmailOrName = function (name, email) {
        var user = Users.find(function (x) { return x.name == name || x.email == email; });
        return Promise.resolve(user);
    };
    FakeAuthData.prototype.GetById = function (Id) {
        var user = Users.find(function (x) { return x.id == Id; });
        return Promise.resolve(user);
    };
    FakeAuthData.prototype.SaveUser = function (user) {
        Users.push(user);
        return Promise.resolve();
    };
    return FakeAuthData;
}());
exports.FakeAuthData = FakeAuthData;
//# sourceMappingURL=FakeAuthData.js.map