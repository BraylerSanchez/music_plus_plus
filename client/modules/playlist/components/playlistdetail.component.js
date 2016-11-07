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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var PlayListDetailComponent = (function () {
    function PlayListDetailComponent(fb, router) {
        this.fb = fb;
        this.router = router;
        this.onSave = new core_1.EventEmitter();
        this.createListForm = fb.group({
            'name': ['', forms_1.Validators.required],
            'description': ['']
        });
    }
    PlayListDetailComponent.prototype.setPlaylist = function (playlist) {
        this.playlist = playlist;
    };
    PlayListDetailComponent.prototype.getPlaylist = function () {
        return this.playlist;
    };
    PlayListDetailComponent.prototype.toSaveDetails = function () {
        this.playlist.name = this.createListForm.value.name;
        this.playlist.description = this.createListForm.value.description;
        this.onSave.next(this.playlist);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlayListDetailComponent.prototype, "onSave", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PlayListDetailComponent.prototype, "playlist", void 0);
    PlayListDetailComponent = __decorate([
        core_1.Component({
            selector: 'playlistdetail',
            styles: [""],
            template: " \n        <div class=\"container col-lg-12\">\n          <form class=\"form-horizontal\" [formGroup]=\"createListForm\" (submit)=\"toSaveDetails()\">\n            <div class=\"form-group\">\n                <div class=\"col-sm-6 col-sm-offset-3\">\n                    <label class=\"control-label col-sm-1\">Name:</label>\n                    <input class=\"form-control\" formControlName=\"name\" id=\"name\" type=\"text\" placeholder=\"Enter name\" required/>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-sm-6 col-sm-offset-3\">\n                    <label class=\"control-label col-sm-1\">Description:</label>\n                    <input class=\"form-control\" formControlName=\"description\" id=\"description\" type=\"text\" placeholder=\"Enter description\" />\n                </div>\n            </div>\n          </form>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router])
    ], PlayListDetailComponent);
    return PlayListDetailComponent;
}());
exports.PlayListDetailComponent = PlayListDetailComponent;
//# sourceMappingURL=playlistdetail.component.js.map