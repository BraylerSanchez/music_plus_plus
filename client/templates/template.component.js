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
var player_component_1 = require('../modules/player/components/player.component');
var sidebar_component_1 = require('./sidebar.component');
var TemplateComponent = (function () {
    function TemplateComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    TemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.listen(this.elementRef.nativeElement.children[2], 'click', function (event) {
            _this.sideBarComponent.hide();
        });
    };
    __decorate([
        core_1.ViewChild(player_component_1.PlayerComponent), 
        __metadata('design:type', player_component_1.PlayerComponent)
    ], TemplateComponent.prototype, "playerComponent", void 0);
    __decorate([
        core_1.ViewChild(sidebar_component_1.SideBarComponent), 
        __metadata('design:type', sidebar_component_1.SideBarComponent)
    ], TemplateComponent.prototype, "sideBarComponent", void 0);
    TemplateComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <toaster-container></toaster-container>\n    <sidebar></sidebar>\n    <div class=\"site-wrapper\">\n      <div class=\"site-wrapper-inner\">\n        <div class=\"cover-container\">\n          <!--div class=\"masthead clearfix\">\n            <div class=\"inner\">\n              <h1 class=\"masthead-brand\"><i class=\"fa fa-music fa-1x\" (click)=\"search()\"></i> Music</h1>\n              <nav>\n                <div class=\"media-body\">\n                  <ul class=\"nav masthead-nav\">\n                    <li [routerLinkActive]=\"['active']\" >\n                      <a [routerLink]=\"['/home']\" >\n                        Home\n                      </a> \n                    </li>\n                    <li [routerLinkActive]=\"['active']\" ><a [routerLink]=\"['/playlist/list']\" > Play List</a> </li>\n                  </ul>\n                </div>\n              </nav>\n            </div>\n          </div -->\n          <div class=\"inner cover\">\n            <router-outlet></router-outlet>\n          </div>\n          <div class=\"mastfoot\">\n            <div class=\"inner\">\n              <p>by @los tigueres.</p>\n            </div>\n          </div>\n          <player></player>\n        </div>\n      </div>\n    </div>",
            styles: ["\n        sidebar{\n            position: absolute;\n            z-index: 100;\n        }\n      "
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map