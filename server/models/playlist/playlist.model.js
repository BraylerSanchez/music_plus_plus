"use strict";
var mongoose = require("mongoose");
var defer = require('q').defer;
var playlist_schema_1 = require("../../schemas/playlist/playlist.schema");
var PlaylistModel = (function () {
    function PlaylistModel() {
        this.playlistModelMG = mongoose.model('playlist', playlist_schema_1.PlayListSchema);
        this.sharedPlaylistModel = mongoose.model('sharedPlaylist', playlist_schema_1.SharedPlaylistSchema);
    }
    PlaylistModel.prototype.list = function (_userId) {
        var def = defer();
        this.playlistModelMG.find({ userAt: _userId }, function (error, docs) {
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
        var def = defer();
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
        var def = defer();
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
        var def = defer();
        var playlist = new this.playlistModelMG(_playlist);
        playlist.save(function (error, doc) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve({
                    message: "Playlist save success.",
                    playlist: doc
                });
            }
        });
        return def.promise;
    };
    PlaylistModel.prototype.update = function (_id, _playlist) {
        var def = defer();
        this.playlistModelMG.update({ _id: _id }, _playlist, {}, function (error, doc) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve({
                    message: "Playlist update success.",
                    playlist: _playlist
                });
            }
        });
        return def.promise;
    };
    PlaylistModel.prototype.share = function (_playlist) {
        var _this = this;
        var def = defer();
        this.sharedPlaylistModel.find({ 'origin._id': _playlist.origin._id }, function (error, docs) {
            if (error) {
                def.reject(error);
                return;
            }
            if (docs.length > 0) {
                _this.sharedPlaylistModel.update({ _id: docs[0]._id }, _playlist, {}, function (error, doc) {
                    if (error)
                        def.reject(error);
                    else
                        def.resolve("Playlist successfully shared.");
                });
            }
            else {
                var sharedPlaylist = new _this.sharedPlaylistModel(_playlist);
                sharedPlaylist.save(function (error, doc) {
                    if (error) {
                        def.reject(error);
                    }
                    else {
                        def.resolve("Playlist successfully shared.");
                    }
                });
            }
        });
        return def.promise;
    };
    PlaylistModel.prototype.search = function () {
        var def = defer();
        this.sharedPlaylistModel.find({}, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(docs);
            }
        });
        return def.promise;
    };
    return PlaylistModel;
}());
exports.PlaylistModel = PlaylistModel;
//# sourceMappingURL=playlist.model.js.map