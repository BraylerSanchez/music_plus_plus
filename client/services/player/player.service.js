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
var PlayerService = (function () {
    function PlayerService(http) {
        var _this = this;
        this.http = http;
        this.maxResults = 20;
        this.isPlaying = false;
        this.apiPart = 'snippet';
        this.apiKey = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
        this.playSound = new Observable_1.Observable(function (observable) {
            _this.playSoundObserbable = observable;
        });
        this.stopSound = new Observable_1.Observable(function (obs) {
            _this.stopSoundObserbable = obs;
        });
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }
    PlayerService.prototype.search = function (query) {
        return this.http.get("https://www.googleapis.com/youtube/v3/search?part=" + this.apiPart + "&maxResults=" + this.maxResults + "&q=" + query + "&key=" + this.apiKey, headers)
            .map(function (res) {
            return res.json().items.map(function (video) {
                return {
                    title: video.snippet.title,
                    description: video.snippet.description,
                    channel: video.snippet.channelTitle,
                    thumbnail: video.snippet.thumbnails.default.url,
                    dateAt: video.snippet.publishedAt,
                    id: video.id.videoId
                };
            });
        });
    };
    PlayerService.prototype.onStopMusic = function () {
        var _this = this;
        this.currentSound.stop();
        this.isPlaying = false;
        window.setTimeout(function () {
            _this.stopSoundObserbable.next(_this.currentVideo);
        }, 0);
        return this.stopSound;
    };
    PlayerService.prototype.onPlayMusic = function (video) {
        var _this = this;
        if (video != undefined) {
            if (this.currentSound != undefined && video.id == this.currentVideo.id) {
                this.currentSound.start();
            }
            else {
                if (this.currentSound) {
                    this.currentSound.stop();
                }
                var request = new XMLHttpRequest();
                request.open("GET", "/api/stream/play/" + video.id, true);
                request.responseType = "arraybuffer";
                request.onload = function () {
                    _this.currentSound = _this.audioContext.createBufferSource();
                    _this.audioContext.decodeAudioData(request.response, function (buffer) {
                        _this.currentSound.buffer = buffer;
                        _this.currentSound.connect(_this.audioContext.destination);
                        _this.currentSound.start(_this.audioContext.currentTime);
                        _this.currentVideo = video;
                        _this.isPlaying = true;
                        _this.playSoundObserbable.next(video);
                    });
                };
                request.send();
            }
        }
        return this.playSound;
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map