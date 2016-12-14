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
var playlist_service_1 = require('../../../services/playlist/playlist.service');
var HomeComponent = (function () {
    function HomeComponent(router, playlistService) {
        this.router = router;
        this.playlistService = playlistService;
        this.playLists = [];
        this.queryString = '';
        this.searchSharedPlaylist();
    }
    HomeComponent.prototype.handleKeyup = function (e) {
        if (e.keyCode == 13) {
            this.search();
        }
    };
    HomeComponent.prototype.search = function () {
        if (this.queryString.length <= 0) {
            alert('Insert text to search.');
            return;
        }
        this.router.navigate(['/search', this.queryString]);
    };
    HomeComponent.prototype.searchSharedPlaylist = function () {
        var _this = this;
        this.playlistService.searchShared().subscribe(function (response) {
            if (response.status == true) {
                _this.playLists = response.playlist;
            }
            else {
                alert(response.message);
            }
        });
    };
    HomeComponent.prototype.play = function (playlist) {
        this.playlistService.changePlaylist(playlist);
    };
    HomeComponent = __decorate([
        core_1.Component({
            styles: ["\n      .home .search-button{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n.vcenter {\n    display: inline-block;\n    vertical-align: middle;\n    float: none;\n}\nimg{\n  width: 100%;\n}\n      "
            ],
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" (keyup)=\"handleKeyup($event)\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <i class=\"btn btn-default fa fa-search search-button\" type=\"button\" (click)=\"search()\"></i>\n            </span>\n          </div>\n        </form>\n          <div class=\"col-xs-12 no-padding-l-r margin-top-md\" >\n              <div class=\"col-xs-12 col-xs-6 col-md-4 col-lg-3 margin-top-md\" *ngFor=\"let playlist of playLists\">\n                  <div class=\"col-xs-12 no-padding-l-r\" style=\"background-color: #fff;border: #969696 solid 1px;\">\n                    <div class=\"col-xs-12 no-padding-l-r\">\n                      <img class=\"img-responsive\" src={{playlist.userPictureUrl}} />\n                    </div>\n                    <div class=\"col-xs-12\">\n                      <div class=\"text-left col-xs-12 no-padding-l-r\">\n                        <h6>{{playlist.origin.name}}<br/><small>{{playlist.origin.description}}</small></h6>\n                      </div>\n                      \n                      <div class=\"vcenter col-xs-12 no-padding-l-r\">\n                        <div class=\"col-xs-6 no-padding-l-r text-left\">\n                          <span>{{playlist.userName}}</span> \n                        </div>\n                        <div class=\"col-xs-6 no-padding-l-r text-right\">\n                          <span>{{playlist.origin.sounds.length}} Song(s)</span>\n                        </div>\n                      </div>\n                    </div>\n                    <button type=\"button\" class=\"btn-primary fa fa-play\" (click)=\"play(playlist.origin)\"></button>\n                    <input type=\"hidden\" value=\"Rating\">\n                  </div>\n              </div>\n          </div>\n      </div>",
            providers: [playlist_service_1.PlaylistService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, playlist_service_1.PlaylistService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map