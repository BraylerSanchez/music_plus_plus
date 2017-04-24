"use strict";
var user_model_1 = require("../../models/security/user.model");
var UserController = (function () {
    function UserController() {
        this.userModel = new user_model_1.UserModel();
    }
    UserController.prototype.login = function (req, res) {
        var _user = req['body'];
        _user.createAt = new Date();
        this.userModel.login(_user).then(function (user) {
            res.json({
                result: true,
                user: user
            });
        }).catch(function (error) {
            res.send({
                result: false,
                message: error
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map