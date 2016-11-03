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
var HomeComponent = (function () {
    function HomeComponent(router) {
        this.router = router;
        this.queryString = '';
    }
    HomeComponent.prototype.handleKeyup = function (e) {
        if (e.keyCode == 13) {
            this.search();
        }
    };
    HomeComponent.prototype.search = function () {
        if (this.queryString.length <= 0) {
            alert('Insert text to search.');
            return;
        }
        this.router.navigate(['/search', this.queryString]);
    };
    HomeComponent = __decorate([
        core_1.Component({
            styles: ["\n      .home .search-button{\n        background-color: #333333 !important;\n        color: white !important;\n      }\n    "],
            template: "\n      <div class=\"inner cover\">\n        <form class=\"home\">\n          <div class=\"input-group input-group-lg\">\n            <input class=\"form-control\" (keyup)=\"handleKeyup($event)\" placeholder=\"Search music on youtube\" name=\"queryString\" [(ngModel)]=\"queryString\" aria-describedby=\"sizing-addon1\"> \n            <span class=\"input-group-btn\">\n              <i class=\"btn btn-default fa fa-search search-button\" type=\"button\" (click)=\"search()\"></i>\n            </span>\n          </div>\n        </form>\n        <div class=\"list-group\">\n          <a *ngFor=\"let video of videos\" class=\"list-group-item\" >{{video.title}}\n            <i *ngIf=\"currentSound.id != video.id\" (click)=\"play(video)\" class=\"glyphicon glyphicon-play pull-right\"></i>\n            <i *ngIf=\"currentSound.id == video.id\" (click)=\"stop(video)\" class=\"glyphicon glyphicon-pause pull-right\"></i>\n          </a>\n        </div>\n      </div>"
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map