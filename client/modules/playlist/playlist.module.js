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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
var playlist_routes_1 = require('./playlist.routes');
var list_component_1 = require('./components/list.component');
var create_component_1 = require('./components/create.component');
var playlistdetail_component_1 = require('./components/playlistdetail.component');
var songlist_component_1 = require('./components/songlist.component');
var home_module_1 = require('../home/home.module');
var can_active_service_1 = require('../../services/user/can.active.service');
var login_service_1 = require('../../services/user/login.service');
var PlaylistModule = (function () {
    function PlaylistModule() {
    }
    PlaylistModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                home_module_1.HomeModule,
                playlist_routes_1.routing
            ],
            declarations: [
                list_component_1.PlayListComponent,
                create_component_1.CreateListComponent,
                playlistdetail_component_1.PlayListDetailComponent,
                songlist_component_1.SongListComponent
            ],
            providers: [
                {
                    provide: 'CanAlwaysActivateGuard',
                    useValue: function () {
                        return true;
                    }
                },
                login_service_1.LoginService,
                can_active_service_1.CanActivateViaAuthGuard
            ],
            bootstrap: [
                list_component_1.PlayListComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PlaylistModule);
    return PlaylistModule;
}());
exports.PlaylistModule = PlaylistModule;
//# sourceMappingURL=playlist.module.js.map