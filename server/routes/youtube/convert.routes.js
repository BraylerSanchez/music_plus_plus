"use strict";
var convert_controller_1 = require("../../controllers/youtube/convert.controller");
var ConvertRoutes = (function () {
    function ConvertRoutes(app) {
        var _this = this;
        this.convertController = new convert_controller_1.ConvertController();
        app.get('/api/v1/youtube/convert/:videoId', function (req, res) { return _this.convertController.toStream(req, res); });
    }
    return ConvertRoutes;
}());
exports.ConvertRoutes = ConvertRoutes;
//# sourceMappingURL=convert.routes.js.map