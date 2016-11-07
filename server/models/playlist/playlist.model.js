"use strict";
var mongoose = require('mongoose');
var q_1 = require('q');
var playlist_schema_1 = require('../../schemas/playlist/playlist.schema');
var PlaylistModel = (function () {
    function PlaylistModel() {
        this.playlistModelMG = mongoose.model('playlist', playlist_schema_1.PlayListSchema);
    }
    PlaylistModel.prototype.list = function () {
        var def = q_1.defer();
        this.playlistModelMG.find({}, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(docs);
            }
        });
        return def.promise;
    };
    PlaylistModel.prototype.get = function (_id) {
        var def = q_1.defer();
        this.playlistModelMG.find({ _id: _id }, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(docs);
            }
        });
        return def.promise;
    };
    PlaylistModel.prototype.delete = function (_id) {
        var def = q_1.defer();
        this.playlistModelMG.remove({ _id: _id }, function (error) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve('playlist delete success');
            }
        });
        return def.promise;
    };
    PlaylistModel.prototype.save = function (_playlist) {
        var def = q_1.defer();
        var playlist = new this.playlistModelMG(_playlist);
        playlist.save(function (error, doc) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve("Playlist save success.");
            }
        });
        return def.promise;
    };
    PlaylistModel.prototype.update = function (_id, _playlist) {
        var def = q_1.defer();
        this.playlistModelMG.update({ _id: _id }, _playlist, {}, function (error, doc) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve("Playlist update success.");
            }
        });
        return def.promise;
    };
    return PlaylistModel;
}());
exports.PlaylistModel = PlaylistModel;
//# sourceMappingURL=playlist.model.js.map