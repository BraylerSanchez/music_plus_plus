"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var app_routes_1 = require("./app.routes");
var home_module_1 = require("./modules/home/home.module");
var playlist_module_1 = require("./modules/playlist/playlist.module");
var template_component_1 = require("./templates/template.component");
var sidebar_partial_component_1 = require("./templates/components/sidebar.partial.component");
var header_partial_component_1 = require("./templates/components/header.partial.component");
var footer_partial_component_1 = require("./templates/components/footer.partial.component");
var login_dialog_component_1 = require("./templates/components/login.dialog.component");
require("hammerjs");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
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
            animations_1.BrowserAnimationsModule,
            forms_1.FormsModule,
            material_1.MaterialModule,
            home_module_1.HomeModule,
            playlist_module_1.PlaylistModule,
        ],
        declarations: [
            template_component_1.TemplateComponent,
            sidebar_partial_component_1.SideBarComponent,
            header_partial_component_1.HeaderPartialComponent,
            footer_partial_component_1.FooterPartialComponent,
            login_dialog_component_1.LoginDialogComponent
        ],
        entryComponents: [login_dialog_component_1.LoginDialogComponent],
        bootstrap: [template_component_1.TemplateComponent],
        providers: [
            {
                provide: common_1.LocationStrategy,
                useClass: common_1.HashLocationStrategy
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map