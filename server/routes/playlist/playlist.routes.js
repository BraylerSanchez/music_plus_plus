"use strict";
var playlist_controller_1 = require('../../controllers/playlist/playlist.controller');
var PlaylistRoutes = (function () {
    function PlaylistRoutes(app) {
        var _this = this;
        this.playlistController = new playlist_controller_1.PlaylistController();
        app.get('/api/v1/:_userId/playlist', function (req, res) { return _this.playlistController.list(req, res); });
        app.get('/api/v1/playlist/:_id', function (req, res) { return _this.playlistController.get(req, res); });
        app.post('/api/v1/playlist', function (req, res) { return _this.playlistController.save(req, res); });
        app.put('/api/v1/playlist/:_id', function (req, res) { return _this.playlistController.update(req, res); });
        app.delete('/api/v1/playlist', function (req, res) { return _this.playlistController.delete(req, res); });
    }
    return PlaylistRoutes;
}());
exports.PlaylistRoutes = PlaylistRoutes;
//# sourceMappingURL=playlist.routes.js.map