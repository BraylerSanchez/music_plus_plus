"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var headers = new http_1.ResponseOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
    }
    PlayerService.prototype.get = function (_id) {
        return this.http.get("api/v1/playlist/" + _id, headers)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.list = function () {
        return this.http.get('api/v1/playlist', headers)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.save = function (_playlist) {
        return this.http.post('api/v1/playlist', headers, _playlist)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.update = function (_id, _playlist) {
        return this.http.put("api/v1/playlist/" + _id, headers, _playlist)
            .map(function (res) { return res.json(); });
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=playlist.service.js.map