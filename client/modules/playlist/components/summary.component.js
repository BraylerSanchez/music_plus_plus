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
var SummaryComponent = (function () {
    function SummaryComponent() {
    }
    return SummaryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SummaryComponent.prototype, "playlist", void 0);
SummaryComponent = __decorate([
    core_1.Component({
        selector: 'summary',
        styles: [],
        template: "\n        <div class=\"container col-xs-12\">\n            <h3>Summary</h3>\n            <div class=\"col-lg-6\">\n                <h4>Name: </h4>\n                <span>{{playlist.name}}</span>\n            </div>\n            <div class=\"col-lg-6\">\n                <h4>Description: </h4>\n                <span>{{playlist.description}}</span>\n            </div>\n            <div class=\"col-lg-12 margin-top-xs\"> \n                <ul class=\"list-group\">\n                    <li *ngFor=\"let sound of playlist.sounds\" class=\"list-group-item\">{{sound.title}}</li>\n                </ul>\n            </div>\n        </div>\n    ",
        providers: []
    }),
    __metadata("design:paramtypes", [])
], SummaryComponent);
exports.SummaryComponent = SummaryComponent;
//# sourceMappingURL=summary.component.js.map