"use strict";
var search_model_1 = require("../../models/youtube/search.model");
var SearchController = (function () {
    function SearchController() {
        this.searchModel = new search_model_1.SearchModel();
    }
    SearchController.prototype.search = function (req, res) {
        var query = req.params['query'];
        this.searchModel.search(query).then(function (sounds) {
            res.send({
                status: true,
                sounds: sounds
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    return SearchController;
}());
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map