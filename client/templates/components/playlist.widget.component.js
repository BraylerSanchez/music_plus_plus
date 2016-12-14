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
var playlist_service_1 = require("../../services/playlist/playlist.service");
var login_service_1 = require("../../services/user/login.service");
var PlaylistWidgetComponent = (function () {
    function PlaylistWidgetComponent(ngZone, loginService, playlistService, router) {
        this.ngZone = ngZone;
        this.loginService = loginService;
        this.playlistService = playlistService;
        this.router = router;
    }
    PlaylistWidgetComponent.prototype.events = function () {
        var _this = this;
        login_service_1.onLoginUser.subscribe(function (user) {
            _this.user = user;
            _this.playlistService.list(_this.user._id).subscribe(function (result) {
                if (result.status == true)
                    _this.playlists = result.playlists;
                _this.ngZone.run(function () { });
            });
        });
    };
    PlaylistWidgetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.events();
        this.user = this.loginService.getUser();
        if (this.user) {
            this.playlistService.list(this.user._id).subscribe(function (result) {
                if (result.status == true)
                    _this.playlists = result.playlists;
            });
        }
    };
    PlaylistWidgetComponent.prototype.change = function (playlist) {
        this.playlistService.changePlaylist(playlist);
    };
    return PlaylistWidgetComponent;
}());
PlaylistWidgetComponent = __decorate([
    core_1.Component({
        styles: ["\n        \n        ul{\n            padding: 0px;\n        }\n        ul li.title{\n            background-color: #333333;\n            padding: 5px;\n            font-size: 11pt;\n            color: white;\n        }\n        ul li{\n            padding: 5px;\n            font-size: 9pt;\n            border-bottom: 1px solid #d0d0d0;\n            color: #333333;\n            cursor: pointer;\n        }\n        ul li.active{\n            background-color: #5bc0de;\n        }\n        ul li:hover{\n            background-color: #e4e4e4;\n        }\n        ul li{\n            text-align: left;\n        }\n        ul li span{\n            width: 90%;\n            display: block;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n        ul li h5{\n            width: 75%;\n        }\n        ul li.title a{\n            float: right;\n            position: relative;\n            top: -30px;\n        }\n        ul li i{\n            float: right;\n            top: -15px;\n            position: relative;\n        }\n        ul li.item i{\n            color: #5bc0de;\n        }\n        ul li.title i{\n            float: none;\n            top: 0;\n            color: #green;\n        }\n        a{\n            margin-right: 3px;\n        }\n    "],
        selector: 'playlist',
        template: "\n    <ul>\n        <li class=\"title\">\n            <h5>Playlist</h5>\n            <a [routerLink]=\"['/playlist/create/0']\" class=\"btn btn-xs btn-success\">Create <i class=\"fa fa-plus\"></i></a>\n        </li>\n        <li class=\"item\" *ngFor=\"let playlist of playlists\" (click)=\"change(playlist)\">\n            <span title=\"{{playlist.name}}\">\n                {{playlist.name}}\n            </span>\n        </li>\n    </ul>",
        providers: [playlist_service_1.PlaylistService, login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        login_service_1.LoginService,
        playlist_service_1.PlaylistService,
        router_1.Router])
], PlaylistWidgetComponent);
exports.PlaylistWidgetComponent = PlaylistWidgetComponent;
//# sourceMappingURL=playlist.widget.component.js.map