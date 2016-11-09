"use strict";
var search_controller_1 = require('../../controllers/youtube/search.controller');
var SearchRoutes = (function () {
    function SearchRoutes(app) {
        var _this = this;
        this.searchController = new search_controller_1.SearchController();
        app.get('/api/v1/youtube/search/:query', function (req, res) { return _this.searchController.search(req, res); });
    }
    return SearchRoutes;
}());
exports.SearchRoutes = SearchRoutes;
//# sourceMappingURL=search.routes.js.map