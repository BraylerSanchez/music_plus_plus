"use strict";
var express = require('express');
var body_parser_1 = require('body-parser');
var path_1 = require('path');
var AppServer = (function () {
    function AppServer() {
        this.app = express();
        this.config();
        this.services();
    }
    AppServer.prototype.config = function () {
        this.app.use(body_parser_1.json());
        this.app.use(body_parser_1.json({ type: 'application/vnd.api+json' }));
        this.app.use(express.static(path_1.join(__dirname, '../public')));
    };
    AppServer.prototype.services = function () {
        this.app.get('/api/stream/play/:videoId', function (req, res) {
        });
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '../pulic/index.html');
        });
    };
    AppServer.prototype.run = function () {
        return this.app.listen(process.env.PORT || 8080, function () {
            console.log("Server running in port: " + (process.env.PORT || 8080));
        });
    };
    AppServer.bootstrap = function () {
        return new AppServer().run();
    };
    return AppServer;
}());
exports.app = AppServer.bootstrap();
//# sourceMappingURL=app.js.map