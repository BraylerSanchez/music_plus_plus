"use strict";
var defer = require('q').defer;
var request = require("request");
var config = require('config');
var SearchModel = (function () {
    function SearchModel() {
        this.yconfig = {};
        this.yconfig = config.get('youtubeParams');
    }
    SearchModel.prototype.search = function (query) {
        var def = defer();
        request({
            method: 'GET',
            url: "https://www.googleapis.com/youtube/v3/search?part=" + this.yconfig['part'] + "&maxResults=" + this.yconfig['length'] + "&q=" + query + "&key=" + this.yconfig['key'] + "&type=" + this.yconfig['type'],
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (error, res, data) {
            if (error) {
                def.reject(error);
            }
            else {
                var sounds = JSON.parse(data).items.map(function (video) {
                    return {
                        title: video.snippet.title,
                        description: video.snippet.description,
                        channel: video.snippet.channelTitle,
                        thumbnail: video.snippet.thumbnails.default.url,
                        dateAt: video.snippet.publishedAt,
                        id: video.id.videoId
                    };
                });
                def.resolve(sounds);
            }
        });
        return def.promise;
    };
    return SearchModel;
}());
exports.SearchModel = SearchModel;
//# sourceMappingURL=search.model.js.map