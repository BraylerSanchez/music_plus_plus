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
var router_1 = require('@angular/router');
var player_service_1 = require('../../services/player/player.service');
var login_service_1 = require('../../services/user/login.service');
var playlist_service_1 = require('../../services/playlist/playlist.service');
var PlayingWidgetComponent = (function () {
    function PlayingWidgetComponent(playerService, ngZone, loginService, playlistService, router) {
        this.playerService = playerService;
        this.ngZone = ngZone;
        this.loginService = loginService;
        this.playlistService = playlistService;
        this.router = router;
        this.onMusicAdd = new core_1.EventEmitter();
        this.currentIndex = -1;
        this.isPlaying = false;
        this.playlist = { name: 'default', description: '', sounds: [], createAt: new Date(), userAt: '', updateAt: new Date() };
    }
    PlayingWidgetComponent.prototype.events = function () {
        var _this = this;
        playlist_service_1.onAddSound.subscribe(function (result) {
            if (result.playlist == _this.playlist.name) {
                _this.playlist.sounds.push(result.sound);
                _this.onMusicAdd.next({ result: false });
            }
        });
        playlist_service_1.onRemoveSound.subscribe(function (result) {
            if (result.playlist == _this.playlist.name) {
                _this.playlist.sounds.splice(result.index, 1);
            }
        });
        playlist_service_1.onPlaylistChange.subscribe(function (result) {
            _this.playlist = result;
            if (_this.playlist.sounds.length <= 0) {
                _this.playerService.suspendMusic();
            }
            _this.ngZone.run(function () { });
        });
        player_service_1.onPlayMusic
            .subscribe(function (response) {
            _this.isPlaying = true;
            _this.currentIndex = response['index'];
            _this.onMusicAdd.next({ result: true });
            _this.ngZone.run(function () { });
        });
        player_service_1.onStopMusic
            .subscribe(function (response) {
            _this.isPlaying = false;
        });
    };
    PlayingWidgetComponent.prototype.removeFromPlaylist = function (e, index) {
        this.playlistService.removeSoundToPlaylist(index);
        e.stopPropagation();
    };
    PlayingWidgetComponent.prototype.ngOnInit = function () {
        this.events();
        var playlist = this.playlistService.getCurrentPlaylist();
        if (playlist) {
            this.playlist = playlist;
        }
    };
    PlayingWidgetComponent.prototype.play = function (index, sound) {
        this.playerService.getMusic(index, sound);
    };
    PlayingWidgetComponent.prototype.toClearPlayList = function () {
        var playlist = { name: 'default', description: '', sounds: [], createAt: new Date(), userAt: '', updateAt: new Date() };
        this.playlistService.changePlaylist(playlist);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlayingWidgetComponent.prototype, "onMusicAdd", void 0);
    PlayingWidgetComponent = __decorate([
        core_1.Component({
            styles: ["\n        \n        ul{\n            padding: 0px;\n        }\n        ul li.title{\n            background-color: #333333;\n            padding: 5px;\n            font-size: 11pt;\n            color: white;\n        }\n        ul li{\n            padding: 5px;\n            font-size: 9pt;\n            border-bottom: 1px solid #d0d0d0;\n            color: #333333;\n            cursor: pointer;\n        }\n        ul li.active{\n            background-color: #5bc0de;\n        }\n        ul li:hover{\n            background-color: #e4e4e4;\n        }\n        ul li.active i{\n            color: #d9edf7;\n        }\n        ul li{\n            text-align: left;\n        }\n        ul li span{\n            width: 90%;\n            display: block;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n        ul li h5{\n            width: 75%;\n        }\n        ul li.title a{\n            float: right;\n            position: relative;\n            top: -30px;\n        }\n        ul li i{\n            float: right;\n            top: -15px;\n            position: relative;\n        }\n        ul li.item i{\n            color: #5bc0de;\n        }\n        ul li.title i{\n            float: none;\n            top: 0;\n            color: #green;\n        }\n        a{\n            margin-right: 3px;\n        }\n    "],
            selector: 'playingList',
            template: "\n    <ul>\n        <li class=\"title\">\n            <h5>{{playlist.name}}</h5>\n            <a *ngIf=\"playlist.name == 'default'\" [routerLink]=\"['/playlist/create/default']\" class=\"btn btn-xs btn-success\">\n                Save <i class=\"fa fa-floppy-o\"></i>\n            </a>\n            <a class=\"btn btn-xs btn-default\" (click)=\"toClearPlayList()\">\n                Clear <i class=\"fa fa-trash\"></i>\n            </a>\n        </li>\n        <li class=\"item\" *ngFor=\"let sound of playlist.sounds; let i = index\" (click)=\"play(i, sound)\" [ngClass]=\"{'active': currentIndex == i}\" >\n            <span title=\"{{sound.title}}\">\n                {{sound.title}}\n            </span>\n            <i *ngIf=\"currentIndex == i && isPlaying\" class=\"fa fa-volume-up\"></i>\n            <i *ngIf=\"currentIndex != i || !isPlaying\" class=\"fa fa-minus pull-right\" (click)=\"removeFromPlaylist($event, i, sound)\"></i>\n        </li>\n    </ul>",
            providers: [player_service_1.PlayerService, playlist_service_1.PlaylistService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, core_1.NgZone, login_service_1.LoginService, playlist_service_1.PlaylistService, router_1.Router])
    ], PlayingWidgetComponent);
    return PlayingWidgetComponent;
}());
exports.PlayingWidgetComponent = PlayingWidgetComponent;
//# sourceMappingURL=playing.widget.component.js.map