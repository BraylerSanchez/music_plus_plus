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
var headers = new http_1.ResponseOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
var HomeComponent = (function () {
    function HomeComponent(http) {
        this.http = http;
        this.apiKey = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
        this.apiPart = 'snippet';
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
        this.http.get("https://www.googleapis.com/youtube/v3/search?part=\n        " + this.apiPart + "\n        &maxResults=" + this.maxResults + "&q=" + this.queryString + "&key=" + this.apiKey, headers)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res.items);
            _this.videos = res.items;
        });
    };
    HomeComponent.prototype.process = function (Data) {
        var _this = this;
        var source = this.audioContext.createBufferSource(); // Create Sound Source
        this.audioContext.decodeAudioData(Data, function (buffer) {
            source.buffer = buffer;
            source.connect(_this.audioContext.destination);
            source.start(_this.audioContext.currentTime);
        });
    };
    HomeComponent.prototype.play = function (video) {
        var _this = this;
        var request = new XMLHttpRequest();
        request.open("GET", "/api/stream/play/" + video.id.videoId, true);
        request.responseType = "arraybuffer";
        request.onload = function () {
            var Data = request.response;
            _this.process(Data);
        };
        request.send();
    };
    HomeComponent = __decorate([
        core_1.Component({
            styles: ["\n      .home .search-text{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n    "],
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" (keyup)=\"handleKeyup($event)\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <button class=\"btn btn-default search-button\" type=\"button\" (click)=\"search()\">Go!</button>\n            </span>\n          </div>\n        </form>\n        <div class=\"list-group\">\n          <a *ngFor=\"let video of videos\" class=\"list-group-item\" >{{video.snippet.title}}\n            <i (click)=\"play(video)\" class=\"glyphicon glyphicon-play pull-right\"></i>\n          </a>\n        </div>\n      </div>"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map