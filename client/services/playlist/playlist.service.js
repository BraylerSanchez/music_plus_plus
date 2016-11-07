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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var headers = new http_1.ResponseOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
var onPlaylistChangeTrigger;
exports.onPlaylistChange = new Observable_1.Observable(function (observable) {
    onPlaylistChangeTrigger = observable;
});
var PlaylistService = (function () {
    function PlaylistService(http) {
        this.http = http;
    }
    PlaylistService.prototype.get = function (_id) {
        return this.http.get("api/v1/playlist/" + _id, headers)
            .map(function (res) { return res.json(); });
    };
    PlaylistService.prototype.list = function () {
        return this.http.get('api/v1/playlist', headers)
            .map(function (res) { return res.json(); });
    };
    PlaylistService.prototype.save = function (_playlist) {
        return this.http.post('api/v1/playlist', _playlist, headers)
            .map(function (res) { return res.json(); });
    };
    PlaylistService.prototype.update = function (_id, _playlist) {
        return this.http.put("api/v1/playlist/" + _id, _playlist, headers)
            .map(function (res) { return res.json(); });
    };
    /*delete(_playlist){
        return this.http['delete']('api/v1/playlist', _playlist, headers)
            .map( res => res.json())
    }*/
    PlaylistService.prototype.changePlaylist = function (playlist) {
        onPlaylistChangeTrigger.next(playlist);
    };
    PlaylistService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
//# sourceMappingURL=playlist.service.js.map