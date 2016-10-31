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
var TemplateComponent = (function () {
    function TemplateComponent() {
    }
    TemplateComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div class=\"site-wrapper\">\n      <div class=\"site-wrapper-inner\">\n        <div class=\"cover-container\">\n          <div class=\"masthead clearfix\">\n            <div class=\"inner\">\n              <h3 class=\"masthead-brand\">Music</h3>\n              <nav>\n                <ul class=\"nav masthead-nav\">\n                  <li [routerLinkActive]=\"['active']><a [routerLink]=\"/home\" >Home</a></li>\n                  <li [routerLinkActive]=\"['active']><a [routerLink]=\"/search/ \" >Search</a></li>\n                </ul>\n              </nav>\n            </div>\n          </div>\n          <div class=\"inner cover\">\n            <router-outlet></router-outlet>\n          </div>\n          <div class=\"mastfoot\">\n            <div class=\"inner\">\n              <p>by @los tigueres.</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map