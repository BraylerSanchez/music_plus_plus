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
var SearchComponent = (function () {
    function SearchComponent(playerService, router) {
        var _this = this;
        this.playerService = playerService;
        this.router = router;
        this.currentSound = {
            id: ''
        };
        this.queryString = '';
        this.videos = [];
        this.router.params.subscribe(function (params) {
            _this.queryString = params['query'];
            _this.search();
        });
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
    SearchComponent = __decorate([
        core_1.Component({
            styles: ["\n    .home .search-button{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n      \n      .playing{\n        content:url(\"http://rs339.pbsrc.com/albums/n442/mcrmy_derick/equalizer.gif~c200\");\n        height: 10%;\n        width: 10%;\n      }\n      \n      .video{\n        color: #333333;\n      }\n\n    #thumbnail{\n            border-radius: 5px;\n        }\n    "],
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <button class=\"btn btn-default search-button\" type=\"button\" (click)=\"search()\">Go!</button>\n            </span>\n          </div>\n        </form>\n        \n  <div class=\"list-group\">\n    <div class=\"video list-group-item\" *ngFor=\"let video of videos\" (click)=\"play(video)\">\n      <div class=\"media-left\">\n        <span>\n          <img id=\"thumbnail\" class=\"media-object\" src=\"{{ video.thumbnail }}\" alt=\"...\">\n        </span>\n      </div>\n      <div class=\"media-body text-left\">\n        <h4 id=\"title\" class=\"media-heading\">{{ video.title }}\n        <img class=\"glyphicon pull-right\" *ngIf=\"video.id == currentSound.id\" [ngClass]=\"{ 'playing': video.id == currentSound.id }\">\n        </h4>\n        <span id=\"channel\">{{ video.channel }}</span>\n        \n        <span class=\"pull-right\">{{ video.dateAt | date }}</span>\n      </div>\n    </div>\n  </div>\n        \n      </div>",
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, router_1.ActivatedRoute])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map