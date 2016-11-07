"use strict";
var convert_model_1 = require('../../models/youtube/convert.model');
var ConvertController = (function () {
    function ConvertController() {
        this.convertModel = new convert_model_1.ConvertModel();
    }
    ConvertController.prototype.toStream = function (req, res) {
        res.set({ 'Content-Type': 'audio/mpeg' });
        var videoId = req.params['videoId'];
        try {
            this.convertModel.toStream(videoId).pipe(res);
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