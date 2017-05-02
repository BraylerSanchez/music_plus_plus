"use strict";
var playlist_model_1 = require("../../models/playlist/playlist.model");
var PlaylistController = (function () {
    function PlaylistController() {
        this.playlistModel = new playlist_model_1.PlaylistModel();
    }
    PlaylistController.prototype.save = function (req, res) {
        var playlist = req['body'];
        playlist.createAt = new Date();
        playlist.updateAt = new Date();
        this.playlistModel.save(playlist).then(function (response) {
            res.json({
                status: true,
                message: response.message,
                playlist: response.playlist
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    PlaylistController.prototype.update = function (req, res) {
        var playlist = req['body'], _id = req.params['_id'];
        playlist.updateAt = new Date();
        this.playlistModel.update(_id, playlist).then(function (response) {
            res.json({
                status: true,
                message: response.message,
                playlist: response.playlist
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    PlaylistController.prototype.get = function (req, res) {
        var id = req.params['_id'];
        if (id == '0') {
            res.send({
                status: false,
                playlist: { name: '', description: '', sounds: [], userAt: '' },
                message: 'object no found'
            });
        }
        this.playlistModel.get(id).then(function (docs) {
            res.json({
                status: true,
                playlist: docs['length'] > 0 ? docs[0] : {}
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    PlaylistController.prototype.list = function (req, res) {
        var userId = req.params['_userId'];
        this.playlistModel.list(userId).then(function (docs) {
            res.json({
                status: true,
                playlists: docs
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    PlaylistController.prototype.delete = function (req, res) {
        var id = req.params['_id'];
        this.playlistModel.delete(id).then(function (result) {
            res.json({
                status: true,
                message: result
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    PlaylistController.prototype.share = function (req, res) {
        var sharedPlaylist = req['body'];
        sharedPlaylist.createAt = new Date();
        this.playlistModel.share(sharedPlaylist).then(function (message) {
            res.json({
                status: true,
                message: message
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    PlaylistController.prototype.search = function (req, res) {
        this.playlistModel.search().then(function (docs) {
            res.json({
                status: true,
                playlist: docs
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    return PlaylistController;
}());
exports.PlaylistController = PlaylistController;
//# sourceMappingURL=playlist.controller.js.map