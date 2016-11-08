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
var login_service_1 = require('../../../services/user/login.service');
var PlayListComponent = (function () {
    function PlayListComponent(router, playlistService, loginService) {
        this.router = router;
        this.playlistService = playlistService;
        this.loginService = loginService;
        this.playLists = [];
        this.queryString = "";
    }
    PlayListComponent.prototype.ngOnInit = function () {
        this.load();
    };
    PlayListComponent.prototype.toCreate = function () {
        this.router.navigate(['/playlist/create/0']);
    };
    PlayListComponent.prototype.load = function () {
        var _this = this;
        var userId = this.loginService.getUser()._id;
        this.playlistService.list(userId).subscribe(function (result) {
            if (result.status == true) {
                _this.playLists = result.playlists;
            }
            else {
                alert(result.message);
            }
        });
    };
    PlayListComponent = __decorate([
        core_1.Component({
            selector: 'playList',
            styles: ["\n    "],
            template: "\n        <div class=\"inner cover\">\n        <h1>Playlists</h1>\n        <div class=\"col-lg-12 no-padding-l-r\">\n            <div class=\"col-lg-12 text-right margin-bottom-xs\">\n                <a class=\"btn btn-success\" (click)=\"toCreate()\">\n                    <i class=\"glyphicon glyphicon-plus-sign\"></i> Create New\n                </a>\n            </div>\n            <table class=\"table table-striped\" *ngIf=\"playLists.length > 0\">\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Description</th>\n                        <th>Sound Length</th>\n                        <th>Action</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let playlist of playLists\">\n                        <td>{{playlist.name}}</td>\n                        <td>{{playlist.description}}</td>\n                        <td>{{playlist.sounds.length}}</td>\n                        <td>\n                            <a class=\"btn btn-xs btn-warning\">\n                                Edit <i class=\"fa fa-pencil\"></i>\n                            </a>\n                            <a class=\"btn btn-xs btn-danger\">\n                                Remove <i class=\"fa fa-times\"></i>\n                            </a>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n            <div class=\"col-lg-12\" *ngIf=\"playLists.length <= 0\">\n                <div class=\"alert alert-warning\">\n                    Click on <a class=\"btn btn-success\" (click)=\"toCreate()\"><i class=\"glyphicon glyphicon-plus-sign\"></i> Create New</a>\n                    to start create playlist.\n                </div>\n            </div>\n        </div>\n        </div>\n    ",
            providers: [playlist_service_1.PlaylistService, login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, playlist_service_1.PlaylistService, login_service_1.LoginService])
    ], PlayListComponent);
    return PlayListComponent;
}());
exports.PlayListComponent = PlayListComponent;
//# sourceMappingURL=list.component.js.map