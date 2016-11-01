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
var SearchComponent = (function () {
    function SearchComponent(playerService) {
        var _this = this;
        this.maxResults = 20;
        this.queryString = '';
        //this.queryString = '';
        playerService.search(this.queryString)
            .subscribe(function (videos) {
            _this.videos = videos;
        });
    }
    SearchComponent = __decorate([
        core_1.Component({
            styles: ["\n    .home .search-text{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n    #channel{\n            color: #ccc;\n        }\n    #thumbnail{\n            border-radius: 5px;\n        }\n    "],
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" (keyup)=\"handleKeyup($event)\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <button class=\"btn btn-default search-button\" type=\"button\" (click)=\"search()\">Go!</button>\n            </span>\n          </div>\n        </form>\n        \n  <div *ngFor=\"let video of videos\">\n    <div class=\"media-left\">\n      <a href=\"#\">\n        <img id=\"thumbnail\" class=\"media-object\" src=\"{{ video.thumbnail }}\" alt=\"...\">\n      </a>\n    </div>\n    <div class=\"media-body\">\n      <h4 class=\"media-heading\">{{ video.title }}</h4>\n      <span id=\"channel\">{{ video.channel }}</span>\n      <i (click)=\"onPlayMusic(video)\" class=\"glyphicon glyphicon-play pull-right\"></i>\n    </div>\n  </div>\n        \n      </div>",
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
///
//# sourceMappingURL=search.component.js.map