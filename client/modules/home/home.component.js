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
var HomeComponent = (function () {
    function HomeComponent(http, playerService) {
        this.http = http;
        this.playerService = playerService;
        this.apiKey = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
        this.apiPart = 'snippet';
        this.currentSound = {
            id: ''
        };
        this.maxResults = 20;
        this.queryString = '';
        this.videos = [];
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }
    HomeComponent.prototype.handleKeyup = function (e) {
        if (e.keyCode == 13) {
            this.search();
        }
    };
    HomeComponent.prototype.search = function () {
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
    HomeComponent.prototype.play = function (video) {
        var _this = this;
        this.playerService.onPlayMusic(video)
            .subscribe(function (sound) {
            _this.currentSound = sound;
        });
    };
    HomeComponent.prototype.stop = function () {
        this.playerService.onStopMusic()
            .subscribe(function () {
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            styles: ["\n      .home .search-button{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n    "],
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" (keyup)=\"handleKeyup($event)\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <button class=\"btn btn-default search-button\" type=\"button\" (click)=\"search()\">Go!</button>\n            </span>\n          </div>\n        </form>\n        <div class=\"list-group\">\n          <a class=\"list-group-item\" >Video Id: {{currentSound.id}}</a>\n          <a *ngFor=\"let video of videos\" class=\"list-group-item\" >{{video.title}}\n            <i *ngIf=\"currentSound.id != video.id\" (click)=\"play(video)\" class=\"glyphicon glyphicon-play pull-right\"></i>\n            <i *ngIf=\"currentSound.id == video.id\" (click)=\"stop(video)\" class=\"glyphicon glyphicon-pause pull-right\"></i>\n          </a>\n        </div>\n      </div>",
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, player_service_1.PlayerService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map