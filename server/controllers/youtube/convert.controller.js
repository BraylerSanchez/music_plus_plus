"use strict";
var convert_model_1 = require("../../models/youtube/convert.model");
var ConvertController = (function () {
    function ConvertController() {
        this.convertModel = new convert_model_1.ConvertModel();
    }
    ConvertController.prototype.toStream = function (req, res) {
        var videoId = req.params['videoId'];
        try {
            var stream = this.convertModel.toStream(videoId);
            stream.on('response', function (streamRes) {
                var totalSize = streamRes.headers['content-length'];
                res.setHeader('Content-Type', 'audio/mp3');
                res.setHeader('Accept-Ranges', "bytes 0-0/" + totalSize);
                stream.pipe(res);
                var dataRead = 0;
                streamRes.on('data', function (data) {
                    dataRead += data.length;
                    var percent = dataRead / totalSize;
                });
                streamRes.on('end', function () {
                    process.stdout.write('\n');
                });
            });
        }
        catch (error) {
            res.send({
                status: false,
                message: error
            });
        }
    };
    return ConvertController;
}());
exports.ConvertController = ConvertController;
//# sourceMappingURL=convert.controller.js.map