"use strict";
var mongoose = require("mongoose");
var defer = require('q').defer;
var user_schema_1 = require("../../schemas/security/user.schema");
var UserModel = (function () {
    function UserModel() {
        this.userModelMG = mongoose.model('user', user_schema_1.UserSchema);
    }
    UserModel.prototype.save = function (_user) {
        var def = defer();
        var user = new this.userModelMG(_user);
        user.save(function (error, doc) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(doc);
            }
        });
        return def.promise;
    };
    UserModel.prototype.get = function (user_name) {
        var def = defer();
        this.userModelMG.find({ user_name: user_name }, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(docs);
            }
        });
        return def.promise;
    };
    UserModel.prototype.login = function (_user) {
        var _this = this;
        var def = defer();
        this.get(_user['user_name']).then(function (users) {
            if (users.length > 0) {
                def.resolve(users[0]);
            }
            else {
                _this.save(_user).then(function (user) {
                    def.resolve(user);
                }).catch(function (error) {
                    def.reject(error);
                });
            }
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map