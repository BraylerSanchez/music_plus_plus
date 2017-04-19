"use strict";
var ytdl = require('ytdl-core');
var ConvertModel = (function () {
    function ConvertModel() {
    }
    ConvertModel.prototype.toStream = function (videoId) {
        var stream = ytdl("http://www.youtube.com/watch?v=" + videoId, {
            quality: 'lowest',
            filter: function (format) {
                return format.container === 'mp4';
            }
        });
        return stream;
    };
    return ConvertModel;
}());
exports.ConvertModel = ConvertModel;
//# sourceMappingURL=convert.model.js.map