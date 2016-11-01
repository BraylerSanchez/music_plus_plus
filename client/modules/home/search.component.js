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
var player_service_1 = require('../../services/player/player.service');
var headers = new http_1.ResponseOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
var SearchComponent = (function () {
    function SearchComponent(playerService) {
        this.playerService = playerService;
        this.maxResults = 20;
        this.currentSound = {
            id: ''
        };
        this.queryString = '';
        this.videos = [];
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }
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
        var _this = this;
        this.playerService.onPlayMusic(video)
            .subscribe(function (sound) {
            _this.currentSound = sound;
        });
    };
    SearchComponent.prototype.stop = function () {
        this.playerService.onStopMusic()
            .subscribe(function () {
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            styles: ["\n    .home .search-button{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n      #title{\n        color: #333333;\n      }\n      }\n    #channel{\n            color: #ccc !important;\n        }\n    #thumbnail{\n            border-radius: 5px;\n        }\n    "],
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <button class=\"btn btn-default search-button\" type=\"button\" (click)=\"search()\">Go!</button>\n            </span>\n          </div>\n        </form>\n        \n  <div class=\"list-group\">\n    <div class=\"list-group-item\" *ngFor=\"let video of videos\">\n      <div class=\"media-left\">\n        <span>\n          <img id=\"thumbnail\" class=\"media-object\" src=\"{{ video.thumbnail }}\" alt=\"...\">\n        </span>\n      </div>\n      <div class=\"media-body\">\n        <h4 id=\"title\" class=\"media-heading\">{{ video.title }}</h4>\n        <span id=\"channel\">{{ video.channel }}</span>\n        <i (click)=\"play(video)\" class=\"glyphicon glyphicon-play pull-right\"></i>\n      </div>\n    </div>\n  </div>\n        \n      </div>",
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
///
//# sourceMappingURL=search.component.js.map