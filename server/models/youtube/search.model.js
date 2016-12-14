"use strict";
var q_1 = require("q");
var request = require("request");
var config = require("config");
var SearchModel = (function () {
    function SearchModel() {
        this.apiPart = 'snippet';
        var youtubeParams = config.get('youtubeParams');
        this.apiKey = youtubeParams['apiKey'];
        this.resultLength = youtubeParams['resultLength'];
    }
    SearchModel.prototype.search = function (query) {
        var _this = this;
        var def = q_1.defer();
        request({
            method: 'GET',
            url: "https://www.googleapis.com/youtube/v3/search?part=" + this.apiPart + "&maxResults=" + this.resultLength + "&q=" + query + "&key=" + this.apiKey + "&type=video&videoDuration=short",
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (error, res, data) {
            if (error) {
                def.reject(error);
            }
            else {
                var shortSongs = JSON.parse(data).items.map(function (video) {
                    return {
                        title: video.snippet.title,
                        description: video.snippet.description,
                        channel: video.snippet.channelTitle,
                        thumbnail: video.snippet.thumbnails.default.url,
                        dateAt: video.snippet.publishedAt,
                        id: video.id.videoId
                    };
                });
                request({
                    method: 'GET',
                    url: "https://www.googleapis.com/youtube/v3/search?part=" + _this.apiPart + "&maxResults=" + _this.resultLength + "&q=" + query + "&key=" + _this.apiKey + "&type=video&videoDuration=medium",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }, function (error, res, data) {
                    if (error) {
                        def.reject(error);
                    }
                    else {
                        var longSongs = JSON.parse(data).items.map(function (video) {
                            return {
                                title: video.snippet.title,
                                description: video.snippet.description,
                                channel: video.snippet.channelTitle,
                                thumbnail: video.snippet.thumbnails.default.url,
                                dateAt: video.snippet.publishedAt,
                                id: video.id.videoId
                            };
                        });
                        var sounds = shortSongs.concat(longSongs);
                        def.resolve(sounds);
                    }
                });
            }
        });
        return def.promise;
    };
    return SearchModel;
}());
exports.SearchModel = SearchModel;
//# sourceMappingURL=search.model.js.map