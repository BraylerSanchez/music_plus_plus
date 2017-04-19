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
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var home_routes_1 = require("./home.routes");
var home_component_1 = require("./components/home.component");
var search_component_1 = require("./components/search.component");
var angular2_toaster_1 = require("angular2-toaster/angular2-toaster");
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        imports: [
            http_1.HttpModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            common_1.CommonModule,
            angular2_toaster_1.ToasterModule,
            home_routes_1.routing
        ],
        exports: [
            search_component_1.SearchComponent
        ],
        declarations: [home_component_1.HomeComponent, search_component_1.SearchComponent],
        bootstrap: [home_component_1.HomeComponent],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map