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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var player_service_1 = require("../../../services/player/player.service");
var playlist_service_1 = require("../../../services/playlist/playlist.service");
var SearchComponent = (function () {
    function SearchComponent(playerService, router, ngZone, playlistService) {
        var _this = this;
        this.playerService = playerService;
        this.router = router;
        this.ngZone = ngZone;
        this.playlistService = playlistService;
        this.currentSound = {
            id: ''
        };
        this.playlist = this.playlist || this.playlistService.getCurrentPlaylist();
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
        playlist_service_1.onPlaylistChange.subscribe(function (playlist) {
            _this.playlist = playlist;
        });
    }
    SearchComponent.prototype.addToPlaylist = function (e, sound) {
        this.playlistService.addSoundToPlaylist({
            playlist: this.playlist.name,
            sound: sound
        });
        //this.toasterService.pop('success', 'Added music to playlist', sound.title);
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
            .subscribe(function (result) {
            if (result.status == true) {
                _this.videos = result.sounds;
            }
        });
    };
    SearchComponent.prototype.play = function (sound) {
        var playlist = this.playlistService.getCurrentPlaylist();
        this.playlistService.addSoundToPlaylist({
            sound: sound,
            playlist: playlist.name
        });
        this.playerService.getMusic(playlist.sounds.length, sound);
        //this.toasterService.pop('success', 'Playing Music', sound.title);
    };
    return SearchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "playlist", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        styles: ["\n      .search-input{\n        margin-top: 15px;\n        width: 80%;\n      }\n      .music-container{\n        overflow-y: auto;\n      }\n      .music-card{\n          width: 256px;\n          margin: 10px;\n          display: inline-block;\n          max-height: 256px;\n          height: 256px;\n      }"],
        template: "\n    \n      <md-input-container class=\"search-input\">\n        <input mdInput\n         (keyup)=\"handleKeyup($event)\" \n         name=\"queryString\" [(ngModel)]=\"queryString\"\n          #searchInput placeholder=\"Search music and press ENTER\" />\n      </md-input-container>\n      \n      <div class=\"music-container\">\n        <h3 md-subheader>Search results</h3>\n        <md-card class=\"music-card\" *ngFor=\"let video of videos; let i = index\">\n          <md-card-header>\n            <md-card-title title=\"{{ video.title }}\">{{ video.title }}</md-card-title>\n            <md-card-subtitle>{{ video.dateAt | date }}</md-card-subtitle>\n          </md-card-header>\n          <img md-card-image [src]=\"video.thumbnail\">\n          <md-card-content>\n            <p>{{ video.description}}</p>\n          </md-card-content>\n          <md-card-actions>\n            <button md-button (click)=\"play(video)\">Play now</button>\n            <button md-button (click)=\"addToPlaylist()\">Add to playlist</button>\n          </md-card-actions>\n        </md-card>\n      </div>",
        providers: [player_service_1.PlayerService, playlist_service_1.PlaylistService]
    }),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        router_1.ActivatedRoute,
        core_1.NgZone,
        playlist_service_1.PlaylistService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map