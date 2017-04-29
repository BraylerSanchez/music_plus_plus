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
var material_1 = require("@angular/material");
var playlist_service_1 = require("../../../services/playlist/playlist.service");
var SearchComponent = (function () {
    function SearchComponent(playerService, router, ngZone, playlistService, snackBar) {
        var _this = this;
        this.playerService = playerService;
        this.router = router;
        this.ngZone = ngZone;
        this.playlistService = playlistService;
        this.snackBar = snackBar;
        this.currentSound = {
            id: ''
        };
        this.playlist = this.playlist || this.playlistService.getCurrentPlaylist();
        this.queryString = '';
        this.sounds = [];
        this.router.params.subscribe(function (params) {
            if (params['query'] != '0') {
                _this.queryString = params['query'] || '';
                if (_this.queryString != '') {
                    _this.search();
                }
            }
        });
    }
    SearchComponent.prototype.addToPlaylist = function (e, sound) {
        this.playlistService.addSoundToPlaylist({
            playlist: this.playlist.name,
            sound: sound
        });
        this.snackBar.open(sound.title + " added to play list", 'Cerrar', {
            duration: 1500,
        });
        e.stopPropagation();
    };
    SearchComponent.prototype.search = function () {
        var _this = this;
        if (this.queryString.length <= 0) {
            this.snackBar.open("Insert text to search", 'Error', {
                duration: 1500,
            });
            return;
        }
        this.playerService.search(this.queryString)
            .subscribe(function (result) {
            if (result.status == true) {
                _this.sounds = result.sounds;
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
        this.snackBar.open(sound.title + " now playing", 'Music', {
            duration: 5000,
        });
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
        styles: ["\n    "],
        template: "\n      <h2 class=\"font-thin m-b\">Search Results</h2>\n      <div class=\"row row-sm\">\n        <div class=\"col-xs-6 col-sm-4 col-md-3 col-lg-2\"  *ngFor=\"let sound of sounds\">\n          <div class=\"item\">\n            <div class=\"pos-rlt\">\n              <div class=\"bottom\">\n                <span class=\"badge bg-info m-l-sm m-b-sm\">03:20</span>\n              </div>\n              <div class=\"item-overlay opacity r r-2x bg-black\">\n                <div class=\"text-info padder m-t-sm text-sm\">\n                  <i class=\"fa fa-star\"></i>\n                  <i class=\"fa fa-star\"></i>\n                  <i class=\"fa fa-star\"></i>\n                  <i class=\"fa fa-star\"></i>\n                  <i class=\"fa fa-star-o text-muted\"></i>\n                </div>\n                <div class=\"center text-center m-t-n\">\n                  <a (click)=\"play(sound)\"><i class=\"icon-control-play i-2x\"></i></a>\n                </div>\n                <div class=\"bottom padder m-b-sm\">\n                  <a href=\"#\" class=\"pull-right\">\n                    <i class=\"fa fa-heart-o\"></i>\n                  </a>\n                  <a (click)=\"addToPlaylist($event, sound)\">\n                    <i class=\"fa fa-plus-circle\"></i>\n                  </a>\n                </div>\n              </div>\n              <a href=\"#\"><img style=\"height: 140px;\"\n                    [src]=\"sound.thumbnail\" alt=\"\" class=\"r r-2x img-full\"\n                    onError=\"this.src='assest/images/p0.jpg'\"></a>\n            </div>\n            <div class=\"padder-v\">\n              <a class=\"text-ellipsis\" mdTooltip=\"{{sound.title}}\">{{sound.title}}</a>\n              <a class=\"text-ellipsis text-xs text-muted\" mdTooltip=\"{{sound.channel}}\">{{sound.channel}}</a>\n            </div>\n          </div>\n        </div>\n      </div>",
        providers: [player_service_1.PlayerService, playlist_service_1.PlaylistService]
    }),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        router_1.ActivatedRoute,
        core_1.NgZone,
        playlist_service_1.PlaylistService,
        material_1.MdSnackBar])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map