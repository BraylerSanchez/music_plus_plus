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
var player_service_1 = require('../../../services/player/player.service');
var playlist_service_1 = require('../../../services/playlist/playlist.service');
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var PlayerComponent = (function () {
    function PlayerComponent(playerService, ngZone, playlistService) {
        this.playerService = playerService;
        this.ngZone = ngZone;
        this.playlistService = playlistService;
        this.isPlaying = false;
        this.isLoading = false;
        this.currentSoundIndex = 0;
        this.soundsLength = 0;
        this.currentTime = 0;
        this.duration = 0;
        this.soundVolume = 1;
        this.audioContext = new AudioContext();
        this.audioNode = this.audioContext.createGain();
        this.eventSubscribe();
    }
    PlayerComponent.prototype.eventSubscribe = function () {
        var _this = this;
        player_service_1.onPlayMusic
            .subscribe(function (response) {
            _this.soundsLength = _this.playlistService.getCurrentPlaylist().sounds.length;
            _this.currentSoundDetails = response['details'];
            _this.currentSoundIndex = response['index'];
            _this.soundBuffer = response['buffer'];
            if (_this.currentSound) {
                window.clearInterval(_this.playingEvent);
                _this.currentSound.stop();
                _this.currentTime = 0;
            }
            _this.play();
        });
        player_service_1.onStopMusic
            .subscribe(function () {
            _this.isPlaying = false;
            _this.ngZone.run(function () { });
        });
        playlist_service_1.onPlaylistChange.subscribe(function (playlist) {
            if (playlist.sounds[0]) {
                _this.playerService.getMusic(0, playlist.sounds[0]);
            }
        });
        player_service_1.onGettingMusic.subscribe(function (sound) {
            _this.currentSoundDetails = sound;
            _this.isLoading = true;
        });
        playlist_service_1.onAddSound.subscribe(function (result) {
            if (result.soundLength <= 0) {
                _this.currentSoundIndex = 0;
            }
            _this.currentSoundIndex = result.soundLength;
        });
        playlist_service_1.onRemoveSound.subscribe(function (result) {
            if (result.soundLength <= 0) {
                _this.currentSoundIndex = 0;
            }
            _this.currentSoundIndex = result.soundLength;
        });
        player_service_1.onSuspendMusic.subscribe(function () {
            _this.stop();
            _this.currentSoundDetails = undefined;
        });
    };
    PlayerComponent.prototype.play = function () {
        var _this = this;
        this.isPlaying = true;
        this.currentSound = this.audioContext.createBufferSource();
        this.audioContext.decodeAudioData(this.soundBuffer, function (buffer) {
            _this.currentSound.buffer = buffer;
            _this.duration = buffer.duration;
            _this.currentSound.loop = false;
            _this.currentSound.start(0, _this.currentTime);
            _this.isLoading = false;
            _this.currentSound.connect(_this.audioNode);
            _this.currentSound.connect(_this.audioContext.destination);
            _this.playingEvent = window.setInterval(function () {
                _this.currentTime += 1;
                if (_this.currentTime > _this.duration) {
                    _this.currentTime = 0;
                    _this.stop();
                    _this.next();
                }
                _this.ngZone.run(function () { });
            }, 1000);
        });
        this.ngZone.run(function () { });
    };
    PlayerComponent.prototype.stop = function () {
        if (this.currentSound) {
            window.clearInterval(this.playingEvent);
            this.currentSound.stop();
            this.playerService.stopMusic(this.currentSoundDetails);
        }
    };
    PlayerComponent.prototype.next = function () {
        if (!this.isLoading) {
            var playlist = this.playlistService.getCurrentPlaylist();
            var index = this.currentSoundIndex + 1;
            if (index < playlist.sounds.length) {
                this.playerService.getMusic(index, playlist.sounds[index]);
            }
        }
    };
    PlayerComponent.prototype.previou = function () {
        if (!this.isLoading) {
            var playlist = this.playlistService.getCurrentPlaylist();
            var index = this.currentSoundIndex - 1;
            if (index >= 0) {
                this.playerService.getMusic(index, playlist.sounds[index]);
            }
        }
    };
    PlayerComponent.prototype.toMinute = function (value) {
        var minute = Math.round((value / 60) % 60);
        return minute < 10 ? '0' + minute : minute;
    };
    PlayerComponent.prototype.toSecound = function (value) {
        var secound = Math.round(value % 60);
        return secound < 10 ? '0' + secound : secound;
    };
    PlayerComponent.prototype.mute = function () {
        this.soundVolume = this.soundVolume == 1 ? 0 : 1;
        this.audioNode.gain.value = this.soundVolume;
    };
    PlayerComponent.prototype.changeSound = function (e) {
        this.stop();
        this.currentTime = e.currentTarget.value * this.duration / 100;
        this.play();
    };
    PlayerComponent.prototype.suspend = function () {
        if (!this.isLoading) {
            this.stop();
            this.playerService.suspendMusic();
        }
    };
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'player',
            styles: ["\n        .player{\n            position: fixed;\n            z-index: 1000;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            background-color: #fff;\n            border-top: solid 1px #c7c7c7;\n            box-shadow: 0px 0px 4px 1px;\n            height: 48px;\n            padding-top: 10px;\n        }\n        .player .progress{\n            margin-top: 5px;\n            position: relative;\n        }\n        .player .progress .progress-bar{\n            background-color: #333;\n        }\n        .player .controls.playing a.common{\n            top: -12px !important;\n        }\n        \n        .player .controls a{\n            font-size: 15pt;\n            color: #333;\n            cursor: pointer;\n            position: relative;\n            transition: 0.4s;\n        }\n        .player .controls a:hover{\n            color: #b3b2b2;\n        }\n        .player .controls a.play{\n            font-size: 30pt;\n            top: -6px;\n        }\n        .player .controls img{\n            height: 40px;\n            width: 40px;\n            left: 50%;\n            margin-top: -6px;\n        }\n        \n        .player .progress span{\n            position: absolute;\n        }\n        \n        .player .progress span.left{\n            left: 5;\n        }\n        \n        .player .progress span.right{\n            right: 5;\n            top: 0;\n        }\n        \n        .player .controls a.disabled{\n            color: gray;\n            cursor: no-drop;\n        }\n        \n        input[type=range] {\n          -webkit-appearance: none;\n          width: 100%;\n          margin: 0.7px 0;\n        }\n        input[type=range]:focus {\n          outline: none;\n        }\n        input[type=range]::-webkit-slider-runnable-track {\n          width: 100%;\n          height: 25.6px;\n          cursor: pointer;\n          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;\n          background: #484d4d;\n          border-radius: 0px;\n          border: 0px solid #010101;\n        }\n        input[type=range]::-webkit-slider-thumb {\n          box-shadow: 0px 0px 1px #670000, 0px 0px 0px #810000;\n          border: 0px solid #ff1e00;\n          height: 27px;\n          width: 18px;\n          border-radius: 0px;\n          background: rgba(255, 67, 95, 0.93);\n          cursor: pointer;\n          -webkit-appearance: none;\n          margin-top: -0.7px;\n        }\n        input[type=range]:focus::-webkit-slider-runnable-track {\n          background: #545a5a;\n        }\n        input[type=range]::-moz-range-track {\n          width: 100%;\n          height: 25.6px;\n          cursor: pointer;\n          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;\n          background: #484d4d;\n          border-radius: 0px;\n          border: 0px solid #010101;\n        }\n        input[type=range]::-moz-range-thumb {\n          box-shadow: 0px 0px 1px #670000, 0px 0px 0px #810000;\n          border: 0px solid #ff1e00;\n          height: 27px;\n          width: 18px;\n          border-radius: 0px;\n          background: rgba(255, 67, 95, 0.93);\n          cursor: pointer;\n        }\n        input[type=range]::-ms-track {\n          width: 100%;\n          height: 25.6px;\n          cursor: pointer;\n          background: transparent;\n          border-color: transparent;\n          color: transparent;\n        }\n        input[type=range]::-ms-fill-lower {\n          background: #3c4040;\n          border: 0px solid #010101;\n          border-radius: 0px;\n          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;\n        }\n        input[type=range]::-ms-fill-upper {\n          background: #484d4d;\n          border: 0px solid #010101;\n          border-radius: 0px;\n          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;\n        }\n        input[type=range]::-ms-thumb {\n          box-shadow: 0px 0px 1px #670000, 0px 0px 0px #810000;\n          border: 0px solid #ff1e00;\n          height: 27px;\n          width: 18px;\n          border-radius: 0px;\n          background: rgba(255, 67, 95, 0.93);\n          cursor: pointer;\n          height: 25.6px;\n        }\n        input[type=range]:focus::-ms-fill-lower {\n          background: #484d4d;\n        }\n        input[type=range]:focus::-ms-fill-upper {\n          background: #545a5a;\n        }\n    "],
            template: "\n    <div class=\"col-lg-12 no-padding-l-r player\" *ngIf=\"currentSoundDetails\" >\n        <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding-l-r\">\n            <div class=\"col-lg-2 col-md-2 hidden-sm hidden-xs no-padding-l-r\"></div>\n            <div class=\"col-lg-8 col-md-8 col-sm-12 col-xs-12\">\n                <div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-6 no-padding-l-r controls\" [ngClass]=\"{'playing': !isLoading}\">\n                    <a class=\"common\" (click)=\"previou()\" [ngClass]=\"{'disabled': currentSoundIndex <= 0 || isLoading }\"><i class=\"fa fa-backward padding-right-xs\"></i></a>\n                    <a class=\"play\" *ngIf=\"!isPlaying && !isLoading\" (click)=\"play()\" ><i class=\"fa fa-play\"></i></a>\n                    <img *ngIf=\"isLoading\" class=\"mini-loading\" src=\"assest/images/loading-xs.gif\" />\n                    <a class=\"play\" *ngIf=\"isPlaying && !isLoading\" (click)=\"stop()\" ><i class=\"fa fa-pause\"></i></a>\n                    <a class=\"common\" (click)=\"next()\" [ngClass]=\"{'disabled': currentSoundIndex +1 >= soundsLength || isLoading  }\" ><i class=\"fa fa-forward padding-left-xs\"></i></a>\n                    <a class=\"common\" (click)=\"suspend()\"  [ngClass]=\"{'disabled': isLoading}\"><i class=\"fa fa-stop\"></i></a>\n                </div>\n                <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-6 no-padding-l-r progress\">\n                    <span class=\"left\">{{toMinute(currentTime)}}:{{toSecound(currentTime)}}</span>\n                    <input class=\"\" type=\"range\"  min=\"0\" max=\"100\" (change)=\"changeSound($event)\" value=\"{{(currentTime / duration * 100)}}\" />\n                    <span class=\"right\">{{toMinute(duration)}}:{{toSecound(duration)}}</span>\n                </div>\n                <div class=\"col-lg-1 col-md-1 col-sm-1 hidden-xs no-padding-l-r controls\">\n                    <a (click)=\"mute()\" class=\"hide\"><i class=\"fa\" [ngClass]=\"{'fa-volume-up': soundVolume ==1, 'fa-volume-off': soundVolume ==0}\"></i></a>\n                </div>\n            </div>\n            <div class=\"col-lg-2 col-md-2 hidden-sm hidden-xs no-padding-l-r\"></div>\n        </div>\n    </div>",
            providers: [player_service_1.PlayerService, playlist_service_1.PlaylistService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, core_1.NgZone, playlist_service_1.PlaylistService])
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map