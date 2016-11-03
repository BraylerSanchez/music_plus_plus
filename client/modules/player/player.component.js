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
var player_service_1 = require('../../services/player/player.service');
var PlayerComponent = (function () {
    function PlayerComponent(playerService, ngZone) {
        var _this = this;
        this.playerService = playerService;
        this.ngZone = ngZone;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        player_service_1.onPlayMusic
            .subscribe(function (response) {
            _this.currentSoundDetails = response['details'];
            _this.soundBuffer = response['buffer'];
            if (_this.currentSound) {
                _this.stop();
                _this.currentTime = 0;
            }
            _this.play();
        });
        player_service_1.onStopMusic
            .subscribe(function (sound) {
            _this.isPlaying = false;
            _this.ngZone.run(function () { });
        });
    }
    PlayerComponent.prototype.play = function () {
        var _this = this;
        this.isPlaying = true;
        this.currentSound = this.audioContext.createBufferSource();
        this.audioContext.decodeAudioData(this.soundBuffer, function (buffer) {
            _this.currentSound.buffer = buffer;
            _this.duration = buffer.duration;
            _this.currentSound.connect(_this.audioContext.destination);
            _this.currentSound.loop = false;
            _this.currentSound.start(0, _this.currentTime);
            _this.playingEvent = window.setInterval(function () {
                _this.currentTime += 1;
                if (_this.currentTime > _this.duration) {
                    _this.currentTime = 0;
                    _this.stop();
                }
                _this.ngZone.run(function () { });
            }, 1000);
        });
        this.ngZone.run(function () { });
    };
    PlayerComponent.prototype.stop = function () {
        window.clearInterval(this.playingEvent);
        this.currentSound.stop(this.currentTime);
        this.playerService.stopMusic(this.currentSound);
    };
    PlayerComponent.prototype.toMinute = function (value) {
        var minute = Math.round((value / 60) % 60);
        return minute < 10 ? '0' + minute : minute;
    };
    PlayerComponent.prototype.toSecound = function (value) {
        var secound = Math.round(value % 60);
        return secound < 10 ? '0' + secound : secound;
    };
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'player',
            styles: ["\n        .player{\n            position: fixed;\n            z-index: 1000;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            background-color: #fff;\n            border-top: solid 1px #c7c7c7;\n            box-shadow: 0px 0px 4px 1px;\n            height: 48px;\n            padding-top: 10px;\n        }\n        .player .progress{\n            margin-top: 5px;\n            position: relative;\n        }\n        .player .progress .progress-bar{\n            background-color: #333;\n        }\n        .player .controls a{\n            font-size: 20pt;\n            color: #333;\n        }\n        .player .progress .progress-counter{\n            color: black;\n            z-index: 1108;\n            position: absolute;\n            left: 45%;\n            text-shadow: 0px 0px 2px white;\n            bottom: 0;\n        }\n    "],
            template: "\n    <div class=\"col-lg-12 no-padding-l-r player\">\n        <div class=\"col-lg-2 col-md-2 col-sm-2 hidden-xs no-padding-l-r\"></div>\n        <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-12\">\n            <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-l-r controls\">\n                <a *ngIf=\"!isPlaying\" (click)=\"play()\" ><i class=\"glyphicon glyphicon-play\"></i></a>\n                <a *ngIf=\"isPlaying\" (click)=\"stop()\" ><i class=\"glyphicon glyphicon-pause\"></i></a>\n                <span></span>\n            </div>\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\">\n                <div class=\"progress text-center\">\n                  <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" [ngStyle]=\"{'width': (currentTime / duration * 100) + '%'}\">\n                  </div>\n                  <span class=\"progress-counter\">{{toMinute(currentTime)}}:{{toSecound(currentTime)}} of {{toMinute(duration)}}:{{toSecound(duration)}}</span>\n                </div>\n            </div>\n            <div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-l-r controls\">\n                <a><i class=\"glyphicon glyphicon-volume-up\"></i></a>\n            </div>\n        </div>\n        <div class=\"col-lg-2 col-md-2 col-sm-2 hidden-xs no-padding-l-r\"></div>\n    </div>",
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, core_1.NgZone])
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map