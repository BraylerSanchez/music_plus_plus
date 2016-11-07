"use strict";
var express = require('express');
var body_parser_1 = require('body-parser');
var path_1 = require('path');
var config = require('config');
var mongoose = require('mongoose');
var playlist_routes_1 = require('./routes/playlist/playlist.routes');
var convert_routes_1 = require('./routes/youtube/convert.routes');
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
        this.app.use(express.static(path_1.join(__dirname, '../client')));
        this.app.use(express.static(path_1.join(__dirname, '../dist')));
        this.app.use(express.static(path_1.join(__dirname, '../node_modules')));
        var dbConfig = config.get("dbConfig");
        mongoose.connect("mongodb://" + dbConfig['host'] + ":" + dbConfig['port'] + "/" + dbConfig['dbName']);
    };
    AppServer.prototype.services = function () {
        new playlist_routes_1.PlaylistRoutes(this.app);
        new convert_routes_1.ConvertRoutes(this.app);
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