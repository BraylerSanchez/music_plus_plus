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
var player_service_1 = require('../../../services/player/player.service');
var playlist_interface_1 = require('../../../interfaces/playlist/playlist.interface');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
var addSoundToPlaylistTrigger;
exports.onAddSoundToPlaylist = new Observable_1.Observable(function (observable) {
    addSoundToPlaylistTrigger = observable;
}).share();
var removeSoundToPlaylistTrigger;
exports.onRemoveSoundToPlaylist = new Observable_1.Observable(function (observable) {
    removeSoundToPlaylistTrigger = observable;
}).share();
var SearchComponent = (function () {
    function SearchComponent(playerService, router, ngZone) {
        var _this = this;
        this.playerService = playerService;
        this.router = router;
        this.ngZone = ngZone;
        this.onAddSound = new EventEmitter();
        this.currentSound = {
            id: ''
        };
        this.queryString = '';
        this.videos = [];
        this.router.params.subscribe(function (params) {
            if (params['query'] != '0') {
                _this.queryString = params['query'] || '';
                if (_this.queryString != '') {
                    _this.search();
                }
            }
        });
        player_service_1.onPlayMusic
            .subscribe(function (response) {
            _this.currentSound = response['details'];
        });
        player_service_1.onStopMusic
            .subscribe(function (sound) {
            _this.currentSound = sound;
            _this.ngZone.run(function () { });
        });
    }
    SearchComponent.prototype.addFromPlaylist = function (e, sound) {
        this.playlist.sounds.push(sound);
        addSoundToPlaylistTrigger.next({
            sound: sound,
            playlist: this.playlist.name
        });
        e.stopPropagation();
    };
    SearchComponent.prototype.removeFromPlaylist = function (e, sound) {
        for (var i = this.playlist.sounds.length - 1; i >= 0; i--) {
            if (this.playlist.sounds[i].id == sound.id) {
                this.playlist.sounds.splice(i, 1);
            }
        }
        removeSoundToPlaylistTrigger.next({
            sound: sound,
            playlist: this.playlist.name
        });
        e.stopPropagation();
    };
    SearchComponent.prototype.handleKeyup = function (e) {
        if (e.keyCode == 13) {
            this.search();
        }
    };
    SearchComponent.prototype.search = function () {
        var _this = this;
        if (this.queryString.length <= 0) {
            alert('Insert text to search.');
            return;
        }
        this.playerService.search(this.queryString)
            .subscribe(function (videos) {
            _this.videos = videos;
        });
    };
    SearchComponent.prototype.play = function (video) {
        this.playerService.getMusic(video);
    };
    SearchComponent.prototype.isAdded = function (video) {
        return this.playlist.sounds.some(function (sound) {
            return sound.id == video.id;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof playlist_interface_1.IPlaylist !== 'undefined' && playlist_interface_1.IPlaylist) === 'function' && _a) || Object)
    ], SearchComponent.prototype, "playlist", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "onAddSound", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            styles: ["\n      .home .search-button{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n      \n      .playing{\n        content:url(\"assest/images/equalizer.gif\");\n        height: 10%;\n        width: 10%;\n      }\n      \n      .video{\n        color: #333333;\n      }\n\n      .media-object{\n          border-radius: 5px !important;\n      }\n      .media-heading .title{\n        cursor: pointer;\n      }\n      .media-heading .title small{\n        display: none;\n      }\n      .media-heading:hover .title small{\n        display: inline-block;\n      }\n    "],
<<<<<<< HEAD
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" (keyup)=\"handleKeyup($event)\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <i class=\"fa fa-search btn btn-default search-button\" type=\"button\" (click)=\"search()\"></i>\n            </span>\n          </div>\n        </form>\n        <div class=\"list-group\">\n          <div class=\"video list-group-item\" *ngFor=\"let video of videos\">\n            <div class=\"media-left\">\n              <span>\n                <img id=\"\n                \" class=\"media-object\" src=\"{{ video.thumbnail }}\" alt=\"...\">\n              </span>\n            </div>\n            <div class=\"media-body text-left\">\n              <div class=\"media-heading\">\n                <h4 class=\"title\" (click)=\"play(video)\" >\n                {{ video.title }} \n                <small >\n                  click to play <i class=\"fa fa-play\"></i>\n                </small>\n                <i *ngIf=\"!isAdded(video)\" class=\"fa fa-plus pull-right\" (click)=\"addFromPlaylist($event, video)\"></i>\n                <i *ngIf=\"isAdded(video)\" class=\"fa fa-minus pull-right\" (click)=\"removeFromPlaylist($event, video)\"></i>\n                <img class=\"glyphicon pull-right\" *ngIf=\"video.id == currentSound.id\" [ngClass]=\"{ 'playing': video.id == currentSound.id }\">\n                </h4>\n              </div>\n              <span  id=\"channel\">{{ video.channel }}</span>\n              <span class=\"pull-right\">{{ video.dateAt | date }}</span>\n              \n            </div>\n          </div>\n        </div>\n        <div *ngFor=\"let cancion of canciones; let i = index\">\n        <ul>\n          <li>{{ i }} - {{ cancion.isOnList }} - {{cancion.title}}</li>\n        </ul>\n        </div>\n      </div>",
=======
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" (keyup)=\"handleKeyup($event)\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <i class=\"fa fa-search btn btn-default search-button\" type=\"button\" (click)=\"search()\"></i>\n            </span>\n          </div>\n        </form>\n        <div class=\"list-group\">\n          <div class=\"video list-group-item\" *ngFor=\"let video of videos\">\n            <div class=\"media-left\">\n              <span>\n                <img id=\"\n                \" class=\"media-object\" src=\"{{ video.thumbnail }}\" alt=\"...\">\n              </span>\n            </div>\n            <div class=\"media-body text-left\">\n              <div class=\"media-heading\">\n                <h4 class=\"title\" (click)=\"play(video)\" >\n                {{ video.title }} \n                <small >\n                  click to play <i class=\"fa fa-play\"></i>\n                </small>\n                <i *ngIf=\"!isAdded(video)\" class=\"fa fa-plus pull-right\" (click)=\"addFromPlaylist($event, video)\"></i>\n                <i *ngIf=\"isAdded(video)\" class=\"fa fa-minus pull-right\" (click)=\"removeFromPlaylist($event, video)\"></i>\n                <img class=\"glyphicon pull-right\" *ngIf=\"video.id == currentSound.id\" [ngClass]=\"{ 'playing': video.id == currentSound.id }\">\n                </h4>\n              </div>\n              <span  id=\"channel\">{{ video.channel }}</span>\n              <span class=\"pull-right\">{{ video.dateAt | date }}</span>\n              \n            </div>\n          </div>\n        </div>\n      </div>",
>>>>>>> e1be92407307a003a1213884e35c76b17dbe006f
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, router_1.ActivatedRoute, core_1.NgZone])
    ], SearchComponent);
    return SearchComponent;
    var _a;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map