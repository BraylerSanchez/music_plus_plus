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
var SongListComponent = (function () {
    function SongListComponent() {
        this.videos = [];
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SongListComponent.prototype, "videos", void 0);
    SongListComponent = __decorate([
        core_1.Component({
            selector: 'songlist',
            styles: ["\n        div.cover {\n            margin-top: 0;\n        }\n    "],
            template: "\n    \n        <div class=\"list-group\">\n            <div *ngIf=\"videos.length == 0\">\n                <div class=\"alert alert-info\">\n                    <h4>Not songs added</h4>\n                </div>\n            </div>\n            <div class=\"video list-group-item\" *ngFor=\"let video of videos\">\n                <div class=\"media-left\">\n                    <span>\n                        <img id=\"\" class=\"media-object\" src=\"{{ video.thumbnail }}\" alt=\"...\">\n                    </span>\n                </div>\n                <div class=\"media-body text-left\">\n                    <div class=\"media-heading\">\n                        <h4 class=\"title\" (click)=\"play(video)\" >\n                            {{ video.title }} \n                            <small>\n                                click to play <i class=\"fa fa-play\"></i>\n                            </small>\n                            <i *ngIf=\"!isAdded(video)\" class=\"fa fa-plus pull-right\" (click)=\"addFromPlaylist($event, video)\"></i>\n                            <i *ngIf=\"isAdded(video)\" class=\"fa fa-minus pull-right\" (click)=\"removeFromPlaylist($event, video)\"></i>\n                            <img class=\"glyphicon pull-right\" *ngIf=\"video.id == currentSound.id\" [ngClass]=\"{ 'playing': video.id == currentSound.id }\">\n                        </h4>\n                    </div>\n                    <span  id=\"channel\">{{ video.channel }}</span>\n                    <span class=\"pull-right\">{{ video.dateAt | date }}</span>\n                </div>\n            </div>\n        </div>",
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], SongListComponent);
    return SongListComponent;
}());
exports.SongListComponent = SongListComponent;
//# sourceMappingURL=songlist.component.js.map