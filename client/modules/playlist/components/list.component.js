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
var PlayListComponent = (function () {
    function PlayListComponent(router) {
        this.router = router;
        this.queryString = "";
    }
    PlayListComponent.prototype.toCreate = function () {
        this.router.navigate(['/playlist/create/0']);
    };
    PlayListComponent = __decorate([
        core_1.Component({
            selector: 'playList',
            styles: ["\n    "],
            template: "\n        <h1>List</h1>\n            <i class=\"glyphicon glyphicon-plus-sign btn-lg\" (click)=\"toCreate()\"></i>\n        <div>\n            <h2>Lists added</h2>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], PlayListComponent);
    return PlayListComponent;
}());
exports.PlayListComponent = PlayListComponent;
//# sourceMappingURL=list.component.js.map