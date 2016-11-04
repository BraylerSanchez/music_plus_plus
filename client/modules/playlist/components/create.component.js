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
var songlist_component_1 = require('./songlist.component');
var playlist_service_1 = require('../../../services/playlist/playlist.service');
var CreateListComponent = (function () {
    function CreateListComponent(router, routerParams, playlistService) {
        var _this = this;
        this.router = router;
        this.routerParams = routerParams;
        this.playlistService = playlistService;
        this.step = 1;
        this.playlist = { name: '', description: '', sounds: [] };
        this.routerParams.params.subscribe(function (params) {
            var id = params['_id'];
            _this.playlistService.get(id).subscribe(function (result) {
                _this.playlist = result.playlist;
            });
        });
    }
    CreateListComponent.prototype.toCancel = function () {
        this.router.navigate(['/playlist/list']);
    };
    CreateListComponent.prototype.step1Save = function (playlist) {
        this.step = 2;
        this.playlist.name = playlist;
        this.playlist.description = playlist;
    };
    __decorate([
        core_1.ViewChild(search_component_1.SearchComponent), 
        __metadata('design:type', search_component_1.SearchComponent)
    ], CreateListComponent.prototype, "searchComponent", void 0);
    __decorate([
        core_1.ViewChild(playlistdetail_component_1.PlayListDetailComponent), 
        __metadata('design:type', playlistdetail_component_1.PlayListDetailComponent)
    ], CreateListComponent.prototype, "playlistdetailComponent", void 0);
    __decorate([
        core_1.ViewChild(songlist_component_1.SongListComponent), 
        __metadata('design:type', songlist_component_1.SongListComponent)
    ], CreateListComponent.prototype, "songlistComponent", void 0);
    CreateListComponent = __decorate([
        core_1.Component({
            selector: 'playlistcreate',
            styles: ["\n        search div.cover {\n            margin-top: 0px !important;\n        }\n        \n    "
            ],
            styleUrls: ['modules/playlist/components/wizardtemplate.css'],
            template: " \n        <h3>Playlist create wizard</h3>\n        <div class=\"container col-lg-12\">\n        \t<div class=\"row\">\n        \t\t<section>\n                <div class=\"wizard\">\n                    <div class=\"wizard-inner\">\n                        <div class=\"connecting-line\"></div>\n                        <ul class=\"nav nav-tabs\" role=\"tablist\">\n                            <li role=\"presentation\" [ngClass]=\"{'active': step == 1, 'disabled': step > 1}\">\n                                <a role=\"tab\" title=\"Creat list detail\">\n                                    <span class=\"round-tab\">\n                                        <i class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></i> \n                                    </span>\n                                </a>\n                            </li>\n        \n                            <li role=\"presentation\" class=\"\" [ngClass]=\"{'active': step == 2, 'disabled': step < 2}\">\n                                <a data-toogle=\"tab\" title=\"Select songs\">\n                                    <span class=\"round-tab\">\n                                        <i class=\"glyphicon glyphicon-th-list\" aria-hidden=\"true\"></i>\n                                    </span>\n                                </a>\n                            </li>\n                            \n                            <li role=\"presentation\" [ngClass]=\"{'active': step=='3', 'disabled': step < 3}\">\n                                <a  title=\"Complete\">\n                                    <span class=\"round-tab\">\n                                        <i class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></i>\n                                    </span>\n                                </a>\n                            </li>\n                            \n                        </ul>\n                    </div>\n                    \n                    <form role=\"form\">\n                        <div class=\"tab-content\">\n                        <div class=\"\">\n                            <a class=\"btn btn-default pull-left\" (click)=\"toCancel()\">\n                                <i class=\"fa fa-times\" ></i> Cancel\n                            </a>\n                            <button *ngIf=\"step === 1 || step === 2\" class=\"btn btn-primary pull-right\">\n                                Next <i class=\"fa fa-arrow-right \" aria-hidden=\"true\" ></i> \n                            </button>\n                            <h1> </h1>\n                            <button *ngIf=\"step === 2 || step === 3\" class=\"btn btn-primary pull-right\">\n                                <i class=\"fa fa-arrow-left \" aria-hidden=\"true\" ></i> Previous\n                                \n                            </button>\n                            <button *ngIf=\"step === 3\" class=\"btn btn-success pull-right\">\n                                Save <i class=\"fa fa-check\" aria-hidden=\"true\" ></i> \n                            </button>\n                        </div>\n                            <div class=\"tab-pane active\" role=\"tabpanel\" [ngClass]=\"{'active': step==1}\">\n                                <playlistdetail \n                                (onSave)=\"step1Save($event)\"\n                                [playlist]=\"playlist\"\n                                ></playlistdetail>\n                            </div>\n                            <div class=\"tab-pane\" role=\"tabpanel\" [ngClass]=\"{'active': step==2}\">\n                                <div class=\"col-sm-6\">\n                                    <h3>Play list:</h3>\n                                    <songlist\n                                        [playlist]=\"playlist\"\n                                    ></songlist>\n                                </div>\n                                <div class=\"col-sm-6\">\n                                    <h3>Search songs:</h3>\n                                    <search\n                                        [playlist]=\"playlist\"\n                                    ></search>\n                                </div>\n                            </div>\n                           \n                            \n                            <div class=\"tab-pane\" role=\"tabpanel\" [ngClass]=\"{'active': step==3}\">\n                                <h3>Complete</h3>\n                                <p>You have successfully completed all steps.</p>\n                                <div class=\"form-group\">\n                                    <button class=\"btn btn-default pull-left\" type=\"button\" (click)=\"this.router.navigate(['/home'])\">\n                                        <i class=\"fa fa-arrow-left \" aria-hidden=\"true\" ></i> Cancel\n                                    </button>\n                                    <button class=\"btn btn-primary pull-right\">\n                                        Next <i class=\"fa fa-arrow-right \" aria-hidden=\"true\" ></i> \n                                    </button>\n                                </div>\n                            </div>\n                            <div class=\"clearfix\"></div>\n                        </div>\n                    </form>\n                </div>  \n                </section>    \n            </div>        \n        </div>\n    \n    \n    ",
            providers: [playlist_service_1.PlaylistService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, playlist_service_1.PlaylistService])
    ], CreateListComponent);
    return CreateListComponent;
}());
exports.CreateListComponent = CreateListComponent;
//# sourceMappingURL=create.component.js.map