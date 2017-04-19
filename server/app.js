"use strict";
var express = require("express");
var json = require('body-parser').json;
var join = require('path').join;
var config = require('config');
var mongoose = require('mongoose');
var playlist_routes_1 = require("./routes/playlist/playlist.routes");
var convert_routes_1 = require("./routes/youtube/convert.routes");
var search_routes_1 = require("./routes/youtube/search.routes");
var AppServer = (function () {
    function AppServer() {
        this.app = express();
        this.config();
        this.services();
    }
    AppServer.prototype.config = function () {
        var path = process.cwd();
        this.app.use(json());
        this.app.use(json({ type: 'application/vnd.api+json' }));
        this.app.use(express.static(join(path)));
        this.app.use(express.static(join(path, '/public')));
        this.app.use(express.static(join(path, '/dist')));
        this.app.use(express.static(join(path, '/node_modules')));
        var dbConfig = config.get("dbConfig");
        mongoose.connect("mongodb://" + dbConfig['host'] + ":" + dbConfig['port'] + "/" + dbConfig['dbName']);
    };
    AppServer.prototype.services = function () {
        new playlist_routes_1.PlaylistRoutes(this.app);
        new convert_routes_1.ConvertRoutes(this.app);
        new search_routes_1.SearchRoutes(this.app);
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