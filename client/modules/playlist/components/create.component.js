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
var search_component_1 = require('../../home/components/search.component');
var playlistdetail_component_1 = require('./playlistdetail.component');
var CreateListComponent = (function () {
    function CreateListComponent(router) {
        this.router = router;
        this.step = "step1";
    }
    CreateListComponent.prototype.toSelectSong = function () {
        this.router.navigate(['/search']);
    };
    __decorate([
        core_1.ViewChild(search_component_1.SearchComponent), 
        __metadata('design:type', search_component_1.SearchComponent)
    ], CreateListComponent.prototype, "searchComponent", void 0);
    __decorate([
        core_1.ViewChild(playlistdetail_component_1.PlayListDetailComponent), 
        __metadata('design:type', playlistdetail_component_1.PlayListDetailComponent)
    ], CreateListComponent.prototype, "playlistdetailComponent", void 0);
    CreateListComponent = __decorate([
        core_1.Component({
            selector: 'playlistcreate',
            styles: ["\n    \n    "
            ],
            styleUrls: ['modules/playlist/components/wizardtemplate.css'],
            template: " \n        <h3>Playlist create wizard</h3>\n        <div class=\"container col-sm-12\">\n        \t<div class=\"row\">\n        \t\t<section>\n                <div class=\"wizard\">\n                    <div class=\"wizard-inner\">\n                        <div class=\"connecting-line\"></div>\n                        <ul class=\"nav nav-tabs\" role=\"tablist\">\n                            <li role=\"presentation\" [ngClass]=\"{'active': step=='step1'}\">\n                                <a (click)=\"step='step1'\" role=\"tab\" title=\"Creat list detail\">\n                                    <span class=\"round-tab\">\n                                        <i class=\"glyphicon glyphicon-pencil\"></i>    \n                                    </span>\n                                </a>\n                            </li>\n        \n                            <li role=\"presentation\" class=\"disabled\">\n                                <a data-toogle=\"tab\" aria-controls=\"step2\" title=\"Select songs\">\n                                    <span class=\"round-tab\">\n                                        <i class=\"glyphicon glyphicon-folder-open\"></i>\n                                    </span>\n                                </a>\n                            </li>\n                            \n                            <li role=\"presentation\" class=\"disabled\">\n                                <a href=\"#complete\" data-toggle=\"tab\" aria-controls=\"complete\" role=\"tab\" title=\"Complete\">\n                                    <span class=\"round-tab\">\n                                        <i class=\"glyphicon glyphicon-ok\"></i>\n                                    </span>\n                                </a>\n                            </li>\n                            \n                        </ul>\n                    </div>\n                    \n                    <form role=\"form\">\n                        <div class=\"tab-content\">\n                            <div class=\"tab-pane active\" role=\"tabpanel\" id=\"step1\">\n                                <playlistdetail></playlistdetail>\n                            </div>\n                            <div class=\"tab-pane\" role=\"tabpanel\" id=\"step2\">\n                                \n                            </div>\n                            \n                            <div class=\"tab-pane\" role=\"tabpanel\" id=\"complete\">\n                                <h3>Complete</h3>\n                                <p>You have successfully completed all steps.</p>\n                            </div>\n                            <div class=\"clearfix\"></div>\n                        </div>\n                    </form>\n                </div>  \n                </section>    \n            </div>        \n        </div>\n    \n    \n    "
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CreateListComponent);
    return CreateListComponent;
}());
exports.CreateListComponent = CreateListComponent;
//# sourceMappingURL=create.component.js.map