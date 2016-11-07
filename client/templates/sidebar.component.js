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
var search_component_1 = require('../modules/home/components/search.component');
var player_service_1 = require('../services/player/player.service');
var login_service_1 = require('../services/user/login.service');
var SideBarComponent = (function () {
    function SideBarComponent(playerService, loginService, ngZone) {
        var _this = this;
        this.playerService = playerService;
        this.loginService = loginService;
        this.ngZone = ngZone;
        this.currentSound = { id: '' };
        this.isPlaying = false;
        this.playlist = { name: 'default', description: '', sounds: [], createAt: new Date(), userAt: '', updateAt: new Date() };
        this.windowHeight = 512;
        this.menuLeft = 250;
        this.active = '';
        search_component_1.onAddSoundToPlaylist.subscribe(function (result) {
            _this.playlist.sounds.push(result.sound);
            _this.active = 'nowplay';
        });
        search_component_1.onRemoveSoundToPlaylist.subscribe(function (result) {
            _this.active = 'nowplay';
            for (var i = _this.playlist.sounds.length - 1; i >= 0; i--) {
                if (_this.playlist.sounds[i].id == result.sound.id) {
                    _this.playlist.sounds.splice(i, 1);
                }
            }
        });
        player_service_1.onPlayMusic
            .subscribe(function (response) {
            _this.windowHeight = window.document.body.clientHeight - 48;
            _this.isPlaying = true;
            _this.active = 'nowplay';
            _this.currentSound = response['details'];
        });
        player_service_1.onStopMusic
            .subscribe(function (response) {
            _this.isPlaying = false;
        });
        player_service_1.onSuspendMusic
            .subscribe(function () {
            _this.windowHeight = window.document.body.clientHeight;
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
    SideBarComponent.prototype.ngOnInit = function () {
        this.windowHeight = window.document.body.clientHeight;
        this.user = this.loginService.getUser();
    };
    SideBarComponent.prototype.setActive = function (menu) {
        if (menu == this.active) {
            this.active = '';
            return;
        }
        this.active = menu;
    };
    SideBarComponent.prototype.play = function (sound) {
        this.playerService.getMusic(sound);
    };
    SideBarComponent.prototype.hide = function () {
        this.active = '';
    };
    SideBarComponent.prototype.login = function () {
        this.loginService.login();
    };
    SideBarComponent.prototype.logout = function () {
        this.loginService.singOut();
    };
    SideBarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            styles: ["\n        .sidebar{\n            position: fixed;\n            left: 0;\n            top: 0;\n        }\n        .sidebar ul.sidebar-menu{\n            transition: 1s;\n            position: relative;\n            margin: 0;\n            padding: 0;\n            text-align: left;\n        }\n        .sidebar ul.sidebar-menu li:first-of-type{\n            margin-top: 0px;\n        }\n        .sidebar ul.sidebar-menu li{\n            border-top: #333333 solid 1px;\n            border-right: #333333 solid 1px;\n            border-left: #333333 solid 1px;\n            font-size: 12pt;\n            display: block;\n            width: 128px;\n            text-transform: uppercase;\n            margin-right: 10px;\n            margin-top: 109px;\n            -webkit-transform: rotate(45deg);\n            -moz-transform: rotate(45deg);\n            -o-transform: rotate(45deg);\n            transform: rotate(90deg);\n            -webkit-transform-origin: 0 100%;\n            -moz-transform-origin: 0 100%;\n            -o-transform-origin: 0 100%;\n            transform-origin: 0 100%;\n            background-color: white;\n            border-top-left-radius: 24px;\n            border-top-right-radius: 24px;\n            text-align: center;\n            padding-top: 5px;\n            color: black;\n            cursor: pointer;\n            transition: 1s;\n        }\n        \n        .sidebar ul.sidebar-menu li:hover{\n            box-shadow: 0px 0px 5px white;\n            color: white;\n            background-color: #333333;\n        }\n        \n        .sidebar ul.sidebar-menu li.active{\n            box-shadow: 0px 0px 5px white;\n            color: white;\n            background-color: #5bc0de;\n        }\n        \n        .sidebar div.menu{  \n            background-color: white; \n            width: 213px;\n            box-shadow: 0px 0px 5px;\n            left: 0;\n            top: 0;\n            position: absolute;\n            transition: 1s;\n            overflow-x: auto;\n            border-right: solid #333333 1px;\n        }\n        \n        .sidebar div.menu::-webkit-scrollbar {\n            width: 7px;\n        }\n         \n        .sidebar div.menu::-webkit-scrollbar-track {\n            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n        }\n         \n        .sidebar div.menu::-webkit-scrollbar-thumb {\n            background-color: rgb(84, 189, 220);\n            outline: 1px solid #999;\n            border-radius: 10px;\n        }\n        \n        .sidebar div.menu .nowplay ul, .sidebar div.menu .home ul{\n            padding: 0px;\n        }\n        .sidebar div.menu .nowplay ul li.title, .sidebar div.menu .home ul li.title{\n            background-color: #333333;\n            padding: 5px;\n            font-size: 11pt;\n            color: white;\n        }\n        .sidebar div.menu .nowplay ul li, .sidebar div.menu .home ul li{\n            padding: 5px;\n            font-size: 9pt;\n            border-bottom: 1px solid #d0d0d0;\n            color: #333333;\n            cursor: pointer;\n        }\n        .sidebar div.menu .nowplay ul li.active, .sidebar div.menu .home ul li.active{\n            background-color: #5bc0de;\n        }\n        .sidebar div.menu .home ul li{\n            font-size: 12pt;\n            text-align: left;\n            padding-left: 30px;\n        }\n        .sidebar div.menu .home ul li a{\n            color: #333333;\n        }\n        .sidebar div.menu .nowplay ul li:hover, .sidebar div.menu .home ul li:hover{\n            background-color: #e4e4e4;\n        }\n        .sidebar div.menu .nowplay ul li{\n            text-align: left;\n        }\n        .sidebar div.menu .nowplay ul li span, .sidebar div.menu .nowplay ul li h5{\n            width: 90%;\n            display: block;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n        .sidebar div.menu .nowplay ul li h5{\n            width: 75%;\n        }\n        .sidebar div.menu .nowplay ul li.title a{\n            float: right;\n            position: relative;\n            top: -30px;\n        }\n        .sidebar div.menu .nowplay ul li i{\n            float: right;\n            top: -15px;\n            position: relative;\n        }\n        .sidebar div.menu .nowplay ul li.item i{\n            color: #5bc0de;\n        }\n        .sidebar div.menu .nowplay ul li.title i{\n            float: none;\n            top: 0;\n            color: #green;\n        }\n    "],
            template: "\n    <div class=\"sidebar\">\n        <ul class=\"sidebar-menu\" [ngStyle]=\"{'left': active != ''? menuLeft : '0px'}\">\n            <li [ngClass]=\"{'active': active == 'menu'}\" (click)=\"setActive('menu')\" >\n                MENU\n            </li>\n            <li [ngClass]=\"{'active': active == 'playlist'}\" (click)=\"setActive('playlist')\">\n                PLAYLIST\n            </li>\n            <li [ngClass]=\"{'active': active == 'nowplay'}\" (click)=\"setActive('nowplay')\">\n                PLAYING\n                <i *ngIf=\"isPlaying\" class=\"fa fa-volume-up\"></i>\n            </li>\n        </ul>\n        <div class=\"menu\" [ngStyle]=\"{'width': active != ''? menuLeft : '0px', 'opacity': active != ''? '1':'0', 'height': windowHeight}\">\n            <div class=\"home\" *ngIf=\"active == 'menu'\">\n                <ul>\n                    <li class=\"title\">\n                    <h3><i class=\"fa fa-music fa-1x\"></i> MUSIC </h3></li>\n                    <li  [routerLinkActive]=\"['active']\" >\n                        <a [routerLink]=\"['/home']\" >\n                            <i class=\"fa fa-home fa-1x\"></i> Home\n                        </a>\n                    </li>\n                    <li  [routerLinkActive]=\"['active']\" >\n                        <a [routerLink]=\"['/playlist/list']\" >\n                            <i class=\"fa fa-list  fa-1x\"></i> Playlist\n                        </a>\n                    </li>\n                    <li  [routerLinkActive]=\"['active']\" >\n                        <a [routerLink]=\"['/search/0']\" >\n                            <i class=\"fa fa-search fa-1x\"></i> search\n                        </a>\n                    </li>\n                    <li>\n                        <span *ngIf=\"user\">{{user.name}}</span>\n                        <a *ngIf=\"user\" class=\"btn btn-warning btn-xs\" (click)=\"logout()\">\n                            <i class=\"fa fa-sign-out \"></i> Sing-Out\n                        </a>\n                        <a *ngIf=\"!user\" class=\"btn btn-primary btn-xs\" (click)=\"login()\">\n                            <i class=\"fa fa-google\"></i> Sing-In\n                        </a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"nowplay\" *ngIf=\"active == 'nowplay'\">\n                <ul>\n                    <li class=\"title\">\n                        <h5>{{playlist.name}}</h5>\n                        <a class=\"btn btn-xs btn-success\">Save <i class=\"fa fa-floppy-o\"></i></a>\n                    </li>\n                    <li class=\"item\" *ngFor=\"let sound of playlist.sounds\" (click)=\"play(sound)\">\n                        <span title=\"{{sound.title}}\">\n                            {{sound.title}}\n                        </span>\n                        <i *ngIf=\"currentSound.id == sound.id\" class=\"fa fa-volume-up\"></i>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>",
            providers: [player_service_1.PlayerService, login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, login_service_1.LoginService, core_1.NgZone])
    ], SideBarComponent);
    return SideBarComponent;
}());
exports.SideBarComponent = SideBarComponent;
//# sourceMappingURL=sidebar.component.js.map