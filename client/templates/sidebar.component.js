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
var player_service_1 = require('../services/player/player.service');
var login_service_1 = require('../services/user/login.service');
var playlist_service_1 = require('../services/playlist/playlist.service');
var playing_widget_component_1 = require('./components/playing.widget.component');
var playlist_widget_component_1 = require('./components/playlist.widget.component');
var SideBarComponent = (function () {
    function SideBarComponent(loginService, ngZone, router) {
        var _this = this;
        this.loginService = loginService;
        this.ngZone = ngZone;
        this.router = router;
        this.isPlaying = false;
        this.windowHeight = 512;
        this.menuLeft = 250;
        this.active = '';
        player_service_1.onStopMusic
            .subscribe(function (response) {
            _this.resizeSideBar();
            _this.isPlaying = false;
        });
        login_service_1.onLoginUser.subscribe(function (user) {
            _this.user = user;
            _this.ngZone.run(function () { });
        });
        login_service_1.onLogoutUser.subscribe(function () {
            _this.user = undefined;
            _this.ngZone.run(function () { });
        });
    }
    SideBarComponent.prototype.musicAdd = function (result) {
        if (result.result) {
            this.resizeSideBar();
            this.isPlaying = true;
        }
        this.active = 'nowplay';
    };
    SideBarComponent.prototype.resizeSideBar = function () {
        if (this.isPlaying == true) {
            this.windowHeight = window.document.body.clientHeight - 48;
        }
        else {
            this.windowHeight = window.document.body.clientHeight;
        }
    };
    SideBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.addEventListener('resize', function (event) {
            _this.resizeSideBar();
        });
        this.resizeSideBar();
        this.user = this.loginService.getUser();
    };
    SideBarComponent.prototype.setActive = function (menu) {
        if (menu == this.active) {
            this.active = '';
            return;
        }
        this.active = menu;
    };
    SideBarComponent.prototype.hide = function () {
        this.active = '';
    };
    SideBarComponent.prototype.login = function () {
        this.loginService.login();
    };
    SideBarComponent.prototype.logout = function () {
        this.loginService.singOut();
        this.router.navigate(['/home']);
    };
    __decorate([
        core_1.ViewChild(playing_widget_component_1.PlayingWidgetComponent), 
        __metadata('design:type', playing_widget_component_1.PlayingWidgetComponent)
    ], SideBarComponent.prototype, "playingWidgetComponent", void 0);
    __decorate([
        core_1.ViewChild(playlist_widget_component_1.PlaylistWidgetComponent), 
        __metadata('design:type', playlist_widget_component_1.PlaylistWidgetComponent)
    ], SideBarComponent.prototype, "playlistWidgetComponent", void 0);
    SideBarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            styles: ["\n        .sidebar{\n            position: fixed;\n            left: 0;\n            top: 0;\n        }\n        .sidebar ul.sidebar-menu{\n            transition: 1s;\n            position: relative;\n            margin: 0;\n            padding: 0;\n            text-align: left;\n        }\n        .sidebar ul.sidebar-menu li:first-of-type{\n            margin-top: 0px;\n        }\n        .sidebar ul.sidebar-menu li{\n            border-top: #333333 solid 1px;\n            border-right: #333333 solid 1px;\n            border-left: #333333 solid 1px;\n            font-size: 12pt;\n            display: block;\n            width: 128px;\n            text-transform: uppercase;\n            margin-right: 10px;\n            margin-top: 109px;\n            -webkit-transform: rotate(45deg);\n            -moz-transform: rotate(45deg);\n            -o-transform: rotate(45deg);\n            transform: rotate(90deg);\n            -webkit-transform-origin: 0 100%;\n            -moz-transform-origin: 0 100%;\n            -o-transform-origin: 0 100%;\n            transform-origin: 0 100%;\n            background-color: white;\n            border-top-left-radius: 24px;\n            border-top-right-radius: 24px;\n            text-align: center;\n            padding-top: 5px;\n            color: black;\n            cursor: pointer;\n            transition: 1s;\n        }\n        \n        .sidebar ul.sidebar-menu li:hover{\n            box-shadow: 0px 0px 5px white;\n            color: white;\n            background-color: #333333;\n        }\n        \n        .sidebar ul.sidebar-menu li.active{\n            box-shadow: 0px 0px 5px white;\n            color: white;\n            background-color: #5bc0de;\n        }\n        \n        .sidebar div.menu{  \n            background-color: white; \n            width: 213px;\n            box-shadow: 0px 0px 5px;\n            left: 0;\n            top: 0;\n            position: absolute;\n            transition: 1s;\n            overflow-x: auto;\n            border-right: solid #333333 1px;\n        }\n        \n        .sidebar div.menu::-webkit-scrollbar {\n            width: 7px;\n        }\n         \n        .sidebar div.menu::-webkit-scrollbar-track {\n            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n        }\n         \n        .sidebar div.menu::-webkit-scrollbar-thumb {\n            background-color: rgb(84, 189, 220);\n            outline: 1px solid #999;\n            border-radius: 10px;\n        }\n        \n        .sidebar div.menu .home ul{\n            padding: 0px;\n        }\n        .sidebar div.menu .home ul li.title{\n            background-color: #333333;\n            padding: 5px;\n            font-size: 11pt;\n            color: white;\n        }\n        .sidebar div.menu .home ul li{\n            padding: 5px;\n            font-size: 9pt;\n            border-bottom: 1px solid #d0d0d0;\n            color: #333333;\n            cursor: pointer;\n        }\n        .sidebar div.menu .home ul li.active{\n            background-color: #5bc0de;\n        }\n        .sidebar div.menu .home ul li{\n            font-size: 12pt;\n            text-align: left;\n            padding-left: 30px;\n        }\n        .sidebar div.menu .home ul li a{\n            color: #333333;\n        }\n        .sidebar div.menu .home ul li:hover{\n            background-color: #e4e4e4;\n        }\n        .sidebar div.menu .nowplay ul li h5{\n            width: 90%;\n            display: block;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n        .sidebar a{\n            margin-right: 3px;\n        }\n    "],
            template: "\n    <div class=\"sidebar\">\n        <ul class=\"sidebar-menu\" [ngStyle]=\"{'left': active != ''? menuLeft : '0px'}\">\n            <li [ngClass]=\"{'active': active == 'menu'}\" (click)=\"setActive('menu')\" >\n                MENU\n            </li>\n            <li [ngClass]=\"{'active': active == 'playlist'}\" (click)=\"setActive('playlist')\" *ngIf=\"user\">\n                PLAYLIST\n            </li>\n            <li [ngClass]=\"{'active': active == 'nowplay'}\" (click)=\"setActive('nowplay')\">\n                PLAYING\n                <i *ngIf=\"isPlaying\" class=\"fa fa-volume-up\"></i>\n            </li>\n        </ul>\n        <div class=\"menu\" [ngStyle]=\"{'width': active != ''? menuLeft : '0px', 'opacity': active != ''? '1':'0', 'height': windowHeight}\">\n            <div class=\"home\" *ngIf=\"active == 'menu'\">\n                <ul>\n                    <li class=\"title\">\n                    <h3><i class=\"fa fa-music fa-1x\"></i> MUSIC++ </h3></li>\n                    <li  [routerLinkActive]=\"['active']\" >\n                        <a [routerLink]=\"['/home']\" >\n                            <i class=\"fa fa-home fa-1x\"></i> Home\n                        </a>\n                    </li>\n                    <li  [routerLinkActive]=\"['active']\" *ngIf=\"user\" >\n                        <a [routerLink]=\"['/playlist/list']\" >\n                            <i class=\"fa fa-list  fa-1x\"></i> Playlist\n                        </a>\n                    </li>\n                    <li  [routerLinkActive]=\"['active']\" >\n                        <a [routerLink]=\"['/search/0']\" >\n                            <i class=\"fa fa-search fa-1x\"></i> search\n                        </a>\n                    </li>\n                    <li>\n                        <span *ngIf=\"user\">{{user.name}}</span>\n                        <a *ngIf=\"user\" class=\"btn btn-warning btn-xs\" (click)=\"logout()\">\n                            <i class=\"fa fa-sign-out \"></i> Sing-Out\n                        </a>\n                        <a *ngIf=\"!user\" class=\"btn btn-primary btn-xs\" (click)=\"login()\">\n                            <i class=\"fa fa-google\"></i> Sing-In\n                        </a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"nowplay\" *ngIf=\"active == 'playlist'\">\n                <playlist></playlist>\n            </div>\n            <div class=\"nowplay\" *ngIf=\"active == 'nowplay'\">\n                <playingList (onMusicAdd)=\"musicAdd($event)\"></playingList>\n            </div>\n        </div>\n    </div>",
            providers: [player_service_1.PlayerService, login_service_1.LoginService, playlist_service_1.PlaylistService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, core_1.NgZone, router_1.Router])
    ], SideBarComponent);
    return SideBarComponent;
}());
exports.SideBarComponent = SideBarComponent;
//# sourceMappingURL=sidebar.component.js.map