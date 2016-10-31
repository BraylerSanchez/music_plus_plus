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
var AppComponent = (function () {
    function AppComponent(http, element) {
        this.http = http;
        this.element = element;
        this.apiKey = 'AIzaSyDsnjiL2Wexp-DgCKMMQF7VyL2xzZLMFaY';
        this.apiPart = 'snippet';
        this.videos = [];
    }
    AppComponent.prototype.seach = function () {
        var _this = this;
        this.http.get("https://www.googleapis.com/youtube/v3/search?part=" + this.apiPart + "&q=" + this.element.nativeElement.children[1].value + "&key=" + this.apiKey, headers)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res.items);
            _this.videos = res.items;
        });
    };
    AppComponent.prototype.play = function (video) {
        var _this = this;
        this.http.get('/api/stream/play/' + video.id.videoId, headers)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res.items);
            _this.videos = res.items;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "<h1>Stream app</h1>\n        <input type=\"search\"  />\n        <a (click)=\"seach()\" >\n            buscar\n        </a>\n        <div>\n            <ul>\n                <li *ngFor=\"let video of videos\">\n                    <img src=\"{{video.snippet.thumbnails.medium.url}}\"/>{{video.snippet.title}}\n                    <a (click)=\"play()\">play</a>\n                </li>\n            </ul>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.ElementRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map