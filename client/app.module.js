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
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var app_routes_1 = require("./app.routes");
var angular2_toaster_1 = require("angular2-toaster/angular2-toaster");
var home_module_1 = require("./modules/home/home.module");
var player_module_1 = require("./modules/player/player.module");
var playlist_module_1 = require("./modules/playlist/playlist.module");
var template_component_1 = require("./templates/template.component");
var sidebar_component_1 = require("./templates/sidebar.component");
var playing_widget_component_1 = require("./templates/components/playing.widget.component");
var playlist_widget_component_1 = require("./templates/components/playlist.widget.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            app_routes_1.routing,
            platform_browser_1.BrowserModule,
            common_1.CommonModule,
            home_module_1.HomeModule,
            player_module_1.PlayerModule,
            playlist_module_1.PlaylistModule,
            angular2_toaster_1.ToasterModule
        ],
        declarations: [
            template_component_1.TemplateComponent,
            sidebar_component_1.SideBarComponent,
            playing_widget_component_1.PlayingWidgetComponent,
            playlist_widget_component_1.PlaylistWidgetComponent
        ],
        bootstrap: [template_component_1.TemplateComponent],
        providers: [
            {
                provide: common_1.LocationStrategy,
                useClass: common_1.HashLocationStrategy
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map