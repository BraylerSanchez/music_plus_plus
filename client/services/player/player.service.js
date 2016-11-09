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
require('rxjs/add/operator/share');
var headers = new http_1.ResponseOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
var playSoundObserbable;
exports.onPlayMusic = new Observable_1.Observable(function (observable) {
    playSoundObserbable = observable;
    return function () { };
}).share();
var stopSoundObserbable;
exports.onStopMusic = new Observable_1.Observable(function (observable) {
    stopSoundObserbable = observable;
}).share();
var onSuspendMusicTrigger;
exports.onSuspendMusic = new Observable_1.Observable(function (observable) {
    onSuspendMusicTrigger = observable;
}).share();
var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
        this.maxResults = 20;
        this.apiPart = 'snippet';
        this.apiKey = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
    }
    PlayerService.prototype.search = function (query) {
        return this.http.get("/api/v1/youtube/search/" + query, headers)
            .map(function (res) { return res.json(); });
    };
    PlayerService.prototype.stopMusic = function (video) {
        stopSoundObserbable.next(video);
    };
    PlayerService.prototype.getMusic = function (video) {
        var request = new XMLHttpRequest();
        request.open("GET", "/api/v1/youtube/convert/" + video.id, true);
        request.responseType = "arraybuffer";
        request.onload = function () {
            if (request.response.status) {
                alert(request.response.message);
            }
            else {
                playSoundObserbable.next({
                    details: video,
                    buffer: request.response
                });
            }
        };
        request.send();
    };
    PlayerService.prototype.suspendMusic = function () {
        onSuspendMusicTrigger.next();
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map