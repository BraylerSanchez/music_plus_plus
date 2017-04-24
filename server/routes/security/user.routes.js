"use strict";
var user_controller_1 = require("../../controllers/security/user.controller");
var UserRoutes = (function () {
    function UserRoutes(app) {
        var _this = this;
        this.userController = new user_controller_1.UserController();
        app.post('/api/v2/user/login', function (req, res) { return _this.userController.login(req, res); });
    }
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map